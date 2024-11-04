import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery } from '@tanstack/react-query'

const postVehicleBody = async (data: FormData) => {
  return await httpClient.post(api.admin.vehicle.type.create.post, data)
}

export const usePostVehicleBody = () => {
  return useMutation({
    mutationKey: ['post' + api.admin.vehicle.type.create.post],
    mutationFn: postVehicleBody
  })
}

export interface IVehicleTypeProps {
  id: number
  name: string
  image: string
  status: string
}

// get vehicle type list
const getVehicleTypeList = async () => {
  return await httpClient.get<IGenericResponse<IVehicleTypeProps[]>>(
    api.admin.vehicle.type.list.get
  )
}

export const useGetVehicleTypeList = () => {
  return useQuery({
    queryKey: [api.admin.vehicle.type.list.get],
    queryFn: () => getVehicleTypeList
  })
}
