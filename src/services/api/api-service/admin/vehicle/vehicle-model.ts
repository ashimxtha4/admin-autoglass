import { TvehicleModelSchemaProps } from '@/components/admin/vehicle/vehicle-model'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const postVehicleModel = async (data: TvehicleModelSchemaProps) => {
  return await httpClient.post(api.admin.vehicle.model.create.post, data)
}

export const usePostVehicleModel = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.vehicle.model.create.post],
    mutationFn: postVehicleModel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.vehicle.model.list.get]
      })
    }
  })
}

export interface IVehicleModelProps {
  id: number
  name: string
  vehicle_brand_id: number
  vehicle_brand: string
  vehicle_type_id: number
  vehicle_type: string
  status: string
}

// get vehicle model
const getVehicleModelList = async () => {
  return await httpClient.get<IGenericResponse<IVehicleModelProps[]>>(
    api.admin.vehicle.model.list.get
  )
}

export const useGetVehicleModelList = () => {
  return useQuery({
    queryKey: [api.admin.vehicle.model.list.get],
    queryFn: () => getVehicleModelList
  })
}
