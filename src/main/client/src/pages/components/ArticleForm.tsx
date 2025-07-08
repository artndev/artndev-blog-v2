import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { LoaderCircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

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
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
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
