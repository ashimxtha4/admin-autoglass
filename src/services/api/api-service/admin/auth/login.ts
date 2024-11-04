import { api } from '@/services/endpoints/api.endpoints'
import { useMutation } from '@tanstack/react-query'
import httpClient from '@/services/api/axios-service'
import Cookies from 'js-cookie'
import { loginSchemaProps } from '@/hooks/login.hook'

export interface LoginProps {
  access_token: string
  token_type: string
  expires_in: number
}

const postLogin = async (
  data: loginSchemaProps
): Promise<{
  data: LoginProps
}> => {
  return await httpClient.post(api.admin.login.post, data)
}

export const useGetLogin = () => {
  return useMutation({
    mutationKey: ['post' + api.admin.login.post],
    mutationFn: postLogin,
    onSuccess: data => {
      const token = data.data.access_token
    //   const expiresIn = data.data.expires_in
      Cookies.set('token', token)

      return data.data
    }
  })
}