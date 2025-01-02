import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

export interface VehicleGroupProps {
  id: number
  name: string
  status: string
}

const getVehicleGroup = async (data: {
  vehicle_brand_id: number
  vehicle_model_id?: number[]
  vehicle_type_id?: number
}): Promise<{
  data: { data: VehicleGroupProps[] }
}> => {
  return await httpClient.post(api.vehicle.group.post, data)
}

export const useGetVehicleGroup = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.group.post],
    mutationFn: getVehicleGroup
  })
}
