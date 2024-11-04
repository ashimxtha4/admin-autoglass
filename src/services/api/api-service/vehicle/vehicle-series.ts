import { api } from '@/services/endpoints/api.endpoints'
import httpClient from '../../axios-service'
import { useMutation } from '@tanstack/react-query'

export interface VehicleSeriesProps {
  id: number
  name: string
  vechicle_model_id: number
  vechicle_model: string
  start_date: string
  end_date: string
  status: string
}

const getVehicleSeries = async (
  vehicle_model_id: number
): Promise<{
  data: { data: VehicleSeriesProps[] }
}> => {
  return await httpClient.post(api.vehicle.series.post, { vehicle_model_id })
}

export const useGetVehicleSeries = () => {
  return useMutation({
    mutationKey: ['post' + api.vehicle.series.post],
    mutationFn: getVehicleSeries
  })
}
