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
import { IsAdminSchema, type T_IsAdminSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Outlet } from 'react-router-dom'

const IsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true) // false
  const form = useForm<T_IsAdminSchema>({
    resolver: zodResolver(IsAdminSchema),
    defaultValues: {
      auth_token: '',
    },
  })

  const onSubmit = (formData: T_IsAdminSchema) => {
    if (formData.auth_token !== import.meta.env.VITE_ADMIN_AUTH_TOKEN) {
      form.setError('auth_token', {
        message: 'Access is forbidden',
      })
      return
    }

    setIsAdmin(true)
  }

  return (
    <>
      {!isAdmin ? (
        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-[min(300px,_100%)]"
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
              <Button type="submit">Submit</Button>
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
