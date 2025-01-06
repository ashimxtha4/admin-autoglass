import { TVehicleGroupSchemaProps } from '@/components/admin/vehicle/group/add-vehicle-group'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const postVehiclePosition = async (data: TVehicleGroupSchemaProps) => {
  return await httpClient.post(api.admin.vehicle.position.create.post, data)
}

export const usePostVehiclePosition = () => {
  return useMutation({
    mutationKey: ['post' + api.admin.vehicle.position.create.post],
    mutationFn: postVehiclePosition
  })
}

export interface IVehiclePositionProps {
  id: number
  name: string
  status: string
}

// get vehicle type list
const getVehiclePositionList = async (page: number) => {
  return await httpClient.get<IGenericResponse<IVehiclePositionProps[]>>(
    api.admin.vehicle.position.list.get(page)
  )
}

export const useGetVehiclePositionList = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.vehicle.position.list.get, page],
    queryFn: () => getVehiclePositionList(page)
  })
}
