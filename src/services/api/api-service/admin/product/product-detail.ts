import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export interface ProductDetailsResponse {
  success: boolean
  message: string
  data: ProductDetailsData
}

export interface ProductDetailsData {
  vp_id: string
  name: string
  auto_glass_shop_catg: string
  auto_glass_shop_id: string
  description: any
  invoice_description: string
  body: string
  sku: string
  price: string
  size: string
  color: string
  start_date: string
  end_date: string
  specific_position: string
  status: string
  syd_stock: number
  mel_stock: number
  vehicle_brand_id: number
  vehicle_brand: string
  vehicle_type_id: number
  vehicle_type: string
  vehicle_position_id: number
  vehicle_position: string
  vehicle_model_id: number
  vehicle_model: string
  vehicle_series_id: number
  vehicle_series: string
  images: Image[]
}

export interface Image {
  id: number
  product_id: number
  image: string
  created_at: string
  updated_at: string
}

const getProductDetails = async (id: number) => {
  return await httpClient.get<ProductDetailsResponse>(
    api.admin.product.detail.get(id)
  )
}

export const useGetProductDetails = () => {
  const params = useSearchParams()
  const id = parseInt(params?.get('id') as string)
  return useQuery({
    queryKey: [api.admin.product.detail.get, id],
    queryFn: () => getProductDetails(id),
    select: data => ({
      data: data.data.data,
      image: data.data.data.images.map(img => ({
        ...img,
        image: `https://backend.autoglassshop.com.au/${img.image}`
      }))
    }),
    enabled: !!id
  })
}
