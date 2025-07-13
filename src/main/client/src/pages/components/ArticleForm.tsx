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
import { ArticleFormSchema, type T_ArticleFormSchema } from '@/lib/schemas.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleFormProps } from '@/pages/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hash, LoaderCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const TAG_REGEXP = /^[A-Za-z]{1,50}$/

const ArticleForm: React.FC<I_ArticleFormProps> = ({
  formTitle,
  onSubmit,
  defaultValues,
}) => {
  const form = useForm<T_ArticleFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      subtitle: '',
      content: '',
      tags: '["default"]',
    },
  })
  const [currentTags, setCurrentTags] = useState<string[]>(['default'])
  const [loadedTags, setLoadedTags] = useState<string[]>([
    'GAMES',
    'BOOKS',
    'TRAVELING',
  ])
  const [tagInput, setTagInput] = useState<string>('')

  useEffect(() => {
    let tags = JSON.parse(form.formState.defaultValues!.tags!) as string[]
    tags = [...tags]
      .filter((tag: string) => tag !== 'default')
      .map((tag: string) => tag.trim().toUpperCase())

    setLoadedTags(Array.from(new Set([...loadedTags, ...tags])))
    setCurrentTags([...currentTags, ...tags])
  }, [])

  useEffect(() => {
    form.setValue('tags', JSON.stringify(currentTags))
  }, [currentTags])

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
          rules={{
            required: true,
            value: 'default',
          }}
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

                      if (!new RegExp(TAG_REGEXP).test(tagInput)) {
                        form.setError('tags', {
                          message: 'Tag is invalid',
                        })
                      } else form.clearErrors('tags')

                      setTagInput(e.target.value)
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

                        if (!new RegExp(TAG_REGEXP).test(tagInput)) return

                        setLoadedTags([
                          ...loadedTags,
                          tagInput.trim().toUpperCase(),
                        ])

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

                      if (!new RegExp(TAG_REGEXP).test(tagInput)) return

                      setLoadedTags([
                        ...loadedTags,
                        tagInput.trim().toUpperCase(),
                      ])

                      setTagInput('')
                    }}
                  >
                    <Hash />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loadedTags.map((tag, i) => {
                    const isIncluded = currentTags.includes(tag)

                    return (
                      <Button
                        type="button"
                        variant={!isIncluded ? 'outline' : 'default'}
                        className="text-xs"
                        onClick={() => {
                          if (isIncluded) {
                            setCurrentTags([
                              ...currentTags.filter(
                                currentTag => currentTag !== tag
                              ),
                            ])
                            return
                          }

                          setCurrentTags([...currentTags, tag])
                        }}
                        key={i}
                      >
                        {tag}
                      </Button>
                    )
                  })}
                </div>
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
