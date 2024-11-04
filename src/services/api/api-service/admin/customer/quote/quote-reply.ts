import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postQuoteReply = async (data: {
  id: number
  name: string
  email: string
  reply: string
  status: string
}) => {
  return await httpClient.post(api.admin.customer.quote.reply.post, data)
}

export const usePostQuoteReply = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.customer.quote.reply.post],
    mutationFn: postQuoteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.customer.quote.list.get]
      })
    }
  })
}
