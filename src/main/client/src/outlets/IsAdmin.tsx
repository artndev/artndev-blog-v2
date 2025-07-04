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
import { useAdminContext } from '@/hooks/use-admin-content'
import { AdminFormSchema, type T_AdminFormSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Outlet, useNavigate } from 'react-router-dom'

const IsAdmin = () => {
  const navigate = useNavigate()
  const { cookies, setCookie } = useAdminContext()
  const form = useForm<T_AdminFormSchema>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: {
      auth_token: '',
    },
  })

  const onSubmit = (formData: T_AdminFormSchema) => {
    if (formData.auth_token !== import.meta.env.VITE_ADMIN_AUTH_TOKEN) {
      form.setError('auth_token', {
        message: 'Access is forbidden',
      })
      return
    }

    setCookie('auth_token_provided', true, {
      maxAge: 3600, // 1h
      // secure: true,
      // sameSite: 'strict',
    })

    navigate(0)
  }

  return (
    <>
      {!cookies.auth_token_provided ? (
        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-[min(500px,_100%)]"
            >
              <span className="text-2xl font-semibold hanken-grotesk">
                Sign in
              </span>
              <FormField
                control={form.control}
                name="auth_token"
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
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default IsAdmin
