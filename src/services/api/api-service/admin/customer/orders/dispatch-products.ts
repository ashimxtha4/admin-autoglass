import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postDispatchProducts = async (data: {
  cart_id: number
  status: string
}) => {
  return await httpClient.post(api.admin.customer.orders.dispatch.post, data)
}

export const usePostDispatchProducts = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.customer.orders.dispatch.post],
    mutationFn: postDispatchProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.customer.orders.product.get]
      })
    }
  })
}
