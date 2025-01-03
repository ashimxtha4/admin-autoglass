import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TImportProductSchemaProps } from '@/components/admin/product/import-products'

const postImportProduct = async (data: TImportProductSchemaProps) => {
  const formData = new FormData()
  formData.append('file', data.file)

  return await httpClient.post(api.admin.product.import.post, formData)
}

export const usePostImportProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.product.import.post],
    mutationFn: postImportProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.product.list]
      })
    }
  })
}
