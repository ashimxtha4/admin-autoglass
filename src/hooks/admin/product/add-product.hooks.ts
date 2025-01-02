import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { z } from 'zod'
import { usePostAddProduct } from '@/services/api/api-service/admin/product/add-product'
import { useGetVehicleMake } from '@/services/api/api-service/vehicle/vehicle-make'
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
  image: z
    .array(z.instanceof(File))
    .refine(
      files =>
        files.every(
          file =>
            (file.size < 5000000 && file.type.includes('.jpeg')) ||
            file.type.includes('.png') ||
            file.type.includes('.jpg')
        ),
      'Please upload a valid image file. (Accepted formats: .jpeg, .png, .jpg)'
    )
    .optional()
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
  const [modelArray, setModelArray] = useState<
    string[] | number[] | undefined
  >()

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

  const parseId = (id: string | undefined) => (id ? parseInt(id) : undefined)

  const vehicle_brand_id = form.watch('vehicle_brand_id')
  // const vehicle_model_id = form.watch('vehicle_model_id')
  const vehicle_series_id = form.watch('vehicle_series_id')
  const vehicle_type_id = form.watch('vehicle_type_id')
  const modelValue = form.getValues('vehicle_model_id')

  useEffect(() => {
    mutateVehicleMake()
  }, [mutateVehicleMake])

  useEffect(() => {
    if (modelValue) {
      let modelArrayString = Array.isArray(modelValue)
        ? modelValue
        : [modelValue]

      // Convert string array to number array
      modelArrayString = modelArrayString.flatMap(value =>
        typeof value === 'string' ? value.split(',').map(Number) : [value]
      )

      setModelArray(modelArrayString)
    }
  }, [modelValue])

  useEffect(() => {
    const fetchData = async () => {
      if (vehicle_brand_id) {
        await mutateVehicleModel(parseInt(vehicle_brand_id))
      }

      if (vehicle_brand_id || modelArray) {
        await mutateVehicleSeries({
          vehicle_brand_id: parseInt(vehicle_brand_id as string),
          vehicle_model_id: modelArray?.map(val => parseInt(val as string))
        })
      }

      if (vehicle_brand_id || modelArray || vehicle_type_id) {
        await mutateVehicleGroup({
          vehicle_brand_id: parseInt(vehicle_brand_id as string),
          vehicle_model_id: modelArray?.map(val => parseInt(val as string)),
          vehicle_type_id: parseId(vehicle_type_id)
        })
      }

      if (vehicle_brand_id || modelArray) {
        await mutateVehicleBody({
          vehicle_brand_id: parseInt(vehicle_brand_id as string),
          vehicle_model_id: modelArray?.map(val => parseInt(val as string))
        })
      }
    }

    fetchData()
  }, [
    vehicle_brand_id,
    modelArray,
    vehicle_series_id,
    vehicle_type_id,
    mutateVehicleModel,
    mutateVehicleSeries,
    mutateVehicleBody,
    mutateVehicleGroup
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
    vehicleModelData: vehicleModelData?.data,
    vehicleGroupData: vehicleGroupData?.data?.data,
    vehicleBodyData: vehicleBodyData?.data?.data,
    vehicleSeriesData: vehicleSeriesData?.data?.data
  }
}
