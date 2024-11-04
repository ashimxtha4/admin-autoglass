import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { usePostAddProduct } from '@/services/api/api-service/admin/product/add-product'
import { useGetVehicleMake } from '@/services/api/api-service/vehicle/vehicle-make'
import { useEffect } from 'react'
import { useGetVehicleModel } from '@/services/api/api-service/vehicle/vehicle-model'
import { useGetVehicleGroup } from '@/services/api/api-service/vehicle/vehicle-group'
import { useGetVehicleSeries } from '@/services/api/api-service/vehicle/vehicle-series'
import { useGetVehicleBody } from '@/services/api/api-service/vehicle/vehicle-body'

const addProductSchema = z.object({
  name: z.string({ required_error: 'Please enter the product name.' }),
  description: z.string({
    required_error: 'Please enter the product description.'
  }),
  invoice_description: z.string({
    required_error: 'Please enter the invoice description.'
  }),
  sku: z.string({ required_error: 'Please enter the SKU.' }),
  price: z.string({ required_error: 'Please enter the price.' }),
  status: z.enum(['enabled', 'disabled'], {
    required_error: 'Please select the status.'
  }),
  syd_stock: z.string({ required_error: 'Please choose stock.' }),
  mel_stock: z.string({ required_error: 'Please choose stock.' }),
  vehicle_brand_id: z.string({
    required_error: 'Please select the vehicle brand.'
  }),
  vehicle_type_id: z.string({
    required_error: 'Please select the vehicle type.'
  }),
  vehicle_position_id: z.string({
    required_error: 'Please select the vehicle position.'
  }),
  vehicle_model_id: z.string().optional(),
  vehicle_series_id: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  image: z.array(z.string()).optional()
})

export type TAddProductSchemaProps = z.infer<typeof addProductSchema>

export const statusOptions = [
  { label: 'Enabled', value: 'enabled' },
  { label: 'Disabled', value: 'disabled' }
]

export const productStock = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' }
]

export const useAddProduct = () => {
  const router = useRouter()
  const { mutateAsync, isPending } = usePostAddProduct()

  const form = useForm<Partial<TAddProductSchemaProps>>({
    resolver: zodResolver(addProductSchema)
  })

  const { data: vehicleMakeData, mutateAsync: mutateVehicleMake } =
    useGetVehicleMake()

  const { data: vehicleModelData, mutateAsync: mutateVehicleModel } =
    useGetVehicleModel()

  const { data: vehicleGroupData, mutateAsync: mutateVehicleGroup } =
    useGetVehicleGroup()

  const { data: vehicleSeriesData, mutateAsync: mutateVehicleSeries } =
    useGetVehicleSeries()

  const { data: vehicleBodyData, mutateAsync: mutateVehicleBody } =
    useGetVehicleBody()

  useEffect(() => {
    mutateVehicleMake()
    mutateVehicleGroup()
    mutateVehicleBody()
  }, [mutateVehicleMake, mutateVehicleGroup, mutateVehicleBody])

  const vehicle_brand_id = form.watch('vehicle_brand_id')
  const vehicle_model_id = form.watch('vehicle_model_id')

  useEffect(() => {
    if (vehicle_brand_id) {
      mutateVehicleModel(parseInt(vehicle_brand_id))
    }

    if (vehicle_model_id) {
      mutateVehicleSeries(parseInt(vehicle_model_id))
    }
  }, [
    vehicle_brand_id,
    mutateVehicleModel,
    vehicle_model_id,
    mutateVehicleSeries
  ])

  const onSubmit = async (data: Partial<TAddProductSchemaProps>) => {
    try {
      await mutateAsync(data)
      toast.success('Product added successfully!')
      form.reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return {
    onSubmit,
    form,
    router,
    isPending,
    vehicleMakeData: vehicleMakeData?.data?.data,
    vehicleModelData: vehicleModelData?.data?.data,
    vehicleGroupData: vehicleGroupData?.data?.data,
    vehicleBodyData: vehicleBodyData?.data?.data,
    vehicleSeriesData: vehicleSeriesData?.data?.data
  }
}
