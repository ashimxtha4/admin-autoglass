import { TVehicleGroupSchemaProps } from '@/components/admin/vehicle/vehicle-group'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery } from '@tanstack/react-query'

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
const getVehiclePositionList = async () => {
  return await httpClient.get<IGenericResponse<IVehiclePositionProps[]>>(
    api.admin.vehicle.position.list.get
  )
}

export const useGetVehiclePositionList = () => {
  return useQuery({
    queryKey: [api.admin.vehicle.position.list.get],
    queryFn: () => getVehiclePositionList
  })
}
