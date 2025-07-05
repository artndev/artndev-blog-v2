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
import { ArticleFormSchema, type T_ArticleFormSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { I_ArticleFormProps } from '../types'
import RichEditor from './RichEditor'

const ArticleForm: React.FC<I_ArticleFormProps> = ({ onSubmit }) => {
  const form = useForm<T_ArticleFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      content: '',
    },
  })

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-[min(1000px,_100%)]"
        >
          <span className="text-2xl font-semibold hanken-grotesk">Article</span>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="max-w-[500px]">
                <FormLabel>Article</FormLabel>
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
                      cn(
                        'border-destructive',
                        'focus-within:border-destructive'
                      )
                  )}
                />
                <FormControl>
                  <Input className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-[200px]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ArticleForm
