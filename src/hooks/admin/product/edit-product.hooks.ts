import { usePatchEditProduct } from '@/services/api/api-service/admin/product/edit-product'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addProductSchema, TAddProductSchemaProps } from './add-product.hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetVehicleMake } from '@/services/api/api-service/vehicle/vehicle-make'
import { useGetVehicleModel } from '@/services/api/api-service/vehicle/vehicle-model'
import { useGetVehicleGroup } from '@/services/api/api-service/vehicle/vehicle-group'
import { useGetVehicleSeries } from '@/services/api/api-service/vehicle/vehicle-series'
import { useGetVehicleBody } from '@/services/api/api-service/vehicle/vehicle-body'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { useGetProductDetails } from '@/services/api/api-service/admin/product/product-detail'

export const useEditProduct = () => {
  const router = useRouter()
  const [modelArray, setModelArray] = useState<
    string[] | number[] | undefined
  >()

  const searchParam = useSearchParams()
  const id = parseInt(searchParam.get('id') || '0')

  const { data } = useGetProductDetails()

  const { mutateAsync, isPending } = usePatchEditProduct()

  const form = useForm<Partial<TAddProductSchemaProps>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      status: 'enabled',
      syd_stock: '1',
      mel_stock: '1'
    }
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

  useEffect(() => {
    if (data?.data) {
      form.setValue('name', data.data.name)
      form.setValue('description', data.data.description)
      form.setValue('invoice_description', data.data.invoice_description)
      form.setValue('color', data.data.color)
      form.setValue('mel_stock', data.data.mel_stock === 1 ? '1' : '0')
      form.setValue('syd_stock', data.data.syd_stock === 1 ? '1' : '0')
      form.setValue('price', data.data.price)
      form.setValue('size', data.data.size)
      form.setValue('sku', data.data.sku)
      form.setValue(
        'status',
        data.data.status === 'ENABLED' ? 'enabled' : 'disabled'
      )
      form.setValue('vehicle_brand_id', data.data?.vehicle_brand_id?.toString())
      form.setValue('vehicle_model_id', data.data?.vehicle_model_id?.toString())
      form.setValue(
        'vehicle_position_id',
        data.data?.vehicle_position_id?.toString()
      )
      form.setValue(
        'vehicle_series_id',
        data.data?.vehicle_series_id?.toString()
      )
      form.setValue('vehicle_type_id', data.data?.vehicle_type_id?.toString())
    }
  }, [data, form])

  const onSubmit = async (data: Partial<TAddProductSchemaProps>) => {
    try {
      await mutateAsync({ id, data })
      toast.success('Product edited successfully!')
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
