import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

interface VehicleMakeProps {
  id: number
  name: string
  status: string
}

const getVehicleMake = async (): Promise<{
  data: { data: VehicleMakeProps[] }
}> => {
  return await httpClient.post(api.vehicle.make.post)
}

export const useGetVehicleMake = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.make.post],
    mutationFn: getVehicleMake
  })
}
