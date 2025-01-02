import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

export interface VehicleModelProps {
  id: number
  name: string
  vehicle_brand_id: number
  vehicle_brand: string
  vehicle_type_id: number
  vehicle_type: string
  status: string
}

const getVehicleModel = async (
  vehicle_brand_id: number
): Promise<{
  data: {
    [key: string]: {
      ids: number[]
      vehicle_type: string
    }
  }
}> => {
  return await httpClient.post(api.vehicle.model.post, {
    vehicle_brand_id
  })
}

export const useGetVehicleModel = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.model.post],
    mutationFn: getVehicleModel
  })
}
