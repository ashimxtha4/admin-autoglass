import { TAddProductSchemaProps } from '@/hooks/admin/product/add-product.hooks'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postAddProduct = async (data: Partial<TAddProductSchemaProps>) => {
  return await httpClient.post(api.cart.post, data)
}

export const usePostAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.cart.post],
    mutationFn: postAddProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.product.list]
      })
    }
  })
}
