import { TVehicleMakeSchemaProps } from '@/components/admin/vehicle/vehicle-make'
import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const postVehicleMake = async (data: TVehicleMakeSchemaProps) => {
  return await httpClient.post(api.admin.vehicle.make.create.post, data)
}

export const usePostVehicleMake = () => {
  return useMutation({
    mutationKey: ['post' + api.admin.vehicle.make.create.post],
    mutationFn: postVehicleMake
  })
}

// get vehicle make list
const getVehicleMake = async (page: number) => {
  return await httpClient.get(api.admin.vehicle.make.list.get(page))
}

export const useGetVehicleMakeList = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.vehicle.make.list.get, page],
    queryFn: () => getVehicleMake(page)
  })
}
