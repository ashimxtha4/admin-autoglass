import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postAddGlassType = async (data: { name: string }) => {
  return await httpClient.post(api.admin.glassType.add.post, data)
}

export const usePostAddGlassType = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.glassType.add.post],
    mutationFn: postAddGlassType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.glassType.list.get]
      })
    }
  })
}
