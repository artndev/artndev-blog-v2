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
import { ArticleFormSchema, type T_ArticleFormSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { I_ArticleFormProps } from '../types'

const ArticleForm: React.FC<I_ArticleFormProps> = ({ onSubmit }) => {
  const form = useForm<T_ArticleFormSchema>({
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
          className="flex flex-col gap-6 w-[min(500px,_100%)]"
        >
          <span className="text-2xl font-semibold hanken-grotesk">Article</span>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input placeholder="xxx-xxx-xxx" {...field} />
                </FormControl>
                <FormDescription>Authorize as admin</FormDescription>
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
