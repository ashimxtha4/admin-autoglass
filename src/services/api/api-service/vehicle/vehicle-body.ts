import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

export interface VehicleBodyProps {
  success: boolean
  message: string
  data: {
    [key: string]: {
      name: string
      vehicle_type: string
    }
  }
}

const getVehicleBody = async (data: {
  vehicle_brand_id: number
  vehicle_model_id?: string[]
}): Promise<{
  data: VehicleBodyProps
}> => {
  return await httpClient.post(api.vehicle.body.post, data)
}

export const useGetVehicleBody = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.body.post],
    mutationFn: getVehicleBody
  })
}
