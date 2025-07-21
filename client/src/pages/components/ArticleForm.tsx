import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios.js'
import { TAG_REGEXP } from '@/lib/regexes.js'
import { ArticleFormSchema, type T_ArticleFormSchema } from '@/lib/schemas.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleFormProps } from '@/pages/types'
import type { I_AxiosError, I_AxiosResponse, I_Tag } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hash, LoaderCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const ArticleForm: React.FC<I_ArticleFormProps> = ({
  formTitle,
  onSubmit,
  defaultValues,
}) => {
  const navigate = useNavigate()
  const form = useForm<T_ArticleFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      subtitle: '',
      content: '',
      tags: [],
    },
  })
  const [tags, setTags] = useState<I_Tag[] | []>([])
  const [currentTags, setCurrentTags] = useState<Set<string>>(new Set())
  const [tagInput, setTagInput] = useState<string>('')

  useEffect(() => {
    axios
      .get('/tags')
      .then((res: I_AxiosResponse<I_Tag[]>) =>
        setTags([...res.data.answer].sort((a, b) => a.id - b.id))
      )
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [])

  useEffect(() => {
    const defaultTags = form.formState.defaultValues!.tags as string[]

    setCurrentTags(new Set([...defaultTags, ...currentTags]))
  }, [])

  useEffect(() => form.setValue('tags', Array.from(currentTags)), [currentTags])

  useEffect(() => {
    if (tagInput === '') return

    if (!new RegExp(TAG_REGEXP).test(tagInput)) {
      form.setError('tags', {
        message: 'Tag is invalid',
      })
    } else form.clearErrors('tags')
  }, [tagInput])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <div className="text-2xl font-semibold hanken-grotesk leading-none">
          {formTitle}
        </div>
        <FormField
          control={form.control}
          name="title"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="max-w-[500px]">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="max-w-[500px]">
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Content</FormLabel>
              <RichEditor
                value={field.value}
                onChange={field.onChange}
                className={cn(
                  'max-w-full',
                  form.formState.errors.content &&
                    cn('border-destructive', 'focus-within:border-destructive')
                )}
              />
              <FormControl>
                <Input className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tags</FormLabel>
              <FormDescription>
                Only lowercase and uppercase latin letters are allowed
              </FormDescription>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    className="max-w-[500px]"
                    value={tagInput}
                    onChange={e => {
                      e.preventDefault()

                      setTagInput(e.target.value.trim())
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()

                        if (!tagInput.length) {
                          form.setError('tags', {
                            message: 'Tag cannot be empty',
                          })
                          return
                        }

                        if (form.formState.errors.tags) return

                        setTags([
                          ...tags,
                          {
                            id:
                              tags.length > 0
                                ? tags[tags.length - 1].id + 1
                                : 1,
                            tagName: tagInput,
                          },
                        ])
                        setCurrentTags(
                          new Set([tagInput.toUpperCase(), ...currentTags])
                        )

                        setTagInput('')
                      }
                    }}
                  />
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={e => {
                      e.preventDefault()

                      if (!tagInput.length) {
                        form.setError('tags', {
                          message: 'Tag cannot be empty',
                        })
                        return
                      }

                      if (form.formState.errors.tags) return

                      setTags([
                        ...tags,
                        {
                          id:
                            tags.length > 0 ? tags[tags.length - 1].id + 1 : 1,
                          tagName: tagInput,
                        },
                      ])
                      setCurrentTags(
                        new Set([tagInput.toUpperCase(), ...currentTags])
                      )

                      setTagInput('')
                    }}
                  >
                    <Hash />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map(({ id, tagName }) => {
                      const isEnabled = currentTags.has(tagName)

                      return (
                        <Button
                          type="button"
                          variant={isEnabled ? 'default' : 'outline'}
                          className="text-xs"
                          onClick={() => {
                            if (isEnabled) {
                              const temp = new Set([...currentTags])
                              temp.delete(tagName)

                              setCurrentTags(temp)

                              return
                            }

                            setCurrentTags(new Set([...currentTags, tagName]))
                          }}
                          key={id}
                        >
                          {tagName.toUpperCase()}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
              <FormControl>
                <Input className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="max-w-[200px] rounded-full"
          disabled={form.formState.isSubmitting}
        >
          Submit
          {form.formState.isSubmitting && (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              aria-hidden="true"
            />
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ArticleForm
