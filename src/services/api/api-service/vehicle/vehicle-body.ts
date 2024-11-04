import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

export interface VehicleBodyProps {
  id: number
  name: string
  image: string
  status: string
}

const getVehicleBody = async (): Promise<{
  data: { data: VehicleBodyProps[] }
}> => {
  return await httpClient.post(api.vehicle.body.post)
}

export const useGetVehicleBody = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.body.post],
    mutationFn: getVehicleBody
  })
}
