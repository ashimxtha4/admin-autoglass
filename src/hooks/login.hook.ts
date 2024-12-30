import { useGetLogin } from "@/services/api/api-service/admin/auth/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

export const loginSchema = z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password should be of minimum 6 characters')
  })
  
  export type loginSchemaProps = z.infer<typeof loginSchema>

export const useLogin = () => {
    const router = useRouter()
    const form = useForm<loginSchemaProps>({
      resolver: zodResolver(loginSchema)
    })

  const { mutateAsync } = useGetLogin()

  const onSubmit = async (data: loginSchemaProps) => {
    try {
      await mutateAsync(data)
      toast.success('Login success!')
      router.push('/', { scroll: true })
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      }
      console.log(error, 'error');
      
      toast.error('Something went wrong!')
    }
  }

  return {
    form, onSubmit, router
  }
}