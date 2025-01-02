// import { api } from '@/services/endpoints/api.endpoints'
// import httpClient from '../../axios-service'
// import { useMutation } from '@tanstack/react-query'

// interface VehicleSidebarProps {
//     success: boolean
//     message: string
//     data: {
//       [key: string]: string
//     }
//   }

// const getVehicleYear = async (data: {
//   vehicle_brand_id: number
//   vehicle_model_id?: number[]
// }): Promise<{
//   data: VehicleSidebarProps
// }> => {
//   return await httpClient.post(api.vehicle.year.post, data)
// }

// export const useGetVehicleYear = () => {
//   return useMutation({
//     mutationKey: ['post' + api.vehicle.year.post],
//     mutationFn: getVehicleYear
//   })
// }
