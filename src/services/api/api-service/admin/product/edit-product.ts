import { TAddProductSchemaProps } from '@/hooks/admin/product/add-product.hooks'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const patchEditProduct = async ({
  id,
  data
}: {
  id: number
  data: Partial<TAddProductSchemaProps>
}) => {
  return await httpClient.patch(api.admin.product.edit.patch(id), data)
}

export const usePatchEditProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['patch' + api.admin.product.add.post],
    mutationFn: patchEditProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.product.list]
      })
    }
  })
}
