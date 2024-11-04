import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useQuery } from '@tanstack/react-query'

export interface IGlassTypeListProps {
  id: number
  name: string
  description: string
  size: string
  status: string
}

// get vehicle model
const getGlassTypeList = async () => {
  return await httpClient.get<IGenericResponse<IGlassTypeListProps[]>>(
    api.admin.glassType.list.get
  )
}

export const useGetGlassTypeList = () => {
  return useQuery({
    queryKey: [api.admin.glassType.list.get],
    queryFn: () => getGlassTypeList
  })
}
