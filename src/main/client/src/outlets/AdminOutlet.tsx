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
import { useAdminContext } from '@/hooks/use-admin-context'
import { useIPContext } from '@/hooks/use-ip-context'
import { AdminFormSchema, type T_AdminFormSchema } from '@/lib/schemas.js'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminOutlet = () => {
  const navigate = useNavigate()
  const { ip } = useIPContext()
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

    if (ip !== import.meta.env.VITE_ADMIN_AUTH_IP) {
      form.setError('root', {
        message: 'You are not whitelisted',
      })
      return
    }

    setCookie('auth_token_provided', true, {
      maxAge: 1800, // 30m
      secure: true,
      sameSite: 'strict',
    })

    navigate(0)
  }

  return (
    <>
      {!cookies.auth_token_provided ? (
        <div className="flex justify-center items-center w-full">
          <div className="w-[min(500px,_100%)]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-full"
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={cn(
                      'text-2xl font-semibold hanken-grotesk leading-none',
                      form.formState.errors.root && 'text-destructive'
                    )}
                  >
                    Sign in to admin panel.
                  </div>
                  {form.formState.errors.root && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="auth_token"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input placeholder="xxx-xxx-xxx" autoFocus {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="max-w-[200px]"
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
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default AdminOutlet
