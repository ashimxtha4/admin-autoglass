import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postChangeStatus = async (data: { cart_id: number; status: string }) => {
  return await httpClient.post(api.admin.customer.orders.status.post, data)
}

export const usePostChangeStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.customer.orders.status.post],
    mutationFn: postChangeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.customer.orders.product.get]
      })
    }
  })
}
