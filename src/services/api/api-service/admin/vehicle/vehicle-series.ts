import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const postVehicleSeries = async (data: {
  name: string
  vehicle_model_id: number
  start_date: string
  end_date?: string
}) => {
  return await httpClient.post(api.admin.vehicle.series.create.post, data)
}

export const usePostVehicleSeries = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['post' + api.admin.vehicle.series.create.post],
    mutationFn: postVehicleSeries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.vehicle.series.list.get]
      })
    }
  })
}

export interface IVehicleSeriesProps {
  id: number
  name: string
  vechicle_model_id: number
  vechicle_model: string
  start_date: string
  end_date: string
  status: string
}

// get vehicle model
const getVehicleSeriesList = async () => {
  return await httpClient.get<IGenericResponse<IVehicleSeriesProps[]>>(
    api.admin.vehicle.series.list.get
  )
}

export const useGetVehicleSeriesList = () => {
  return useQuery({
    queryKey: [api.admin.vehicle.series.list.get],
    queryFn: () => getVehicleSeriesList
  })
}
