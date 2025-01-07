import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface ICustomerOrdersProps {
  id: number
  customer_id: number
  product_id: number
  product_name: string
  product_price: string
  product_sku: string
  product_image: string
  status: string
}

const getCustomerOrders = async (page: number) => {
  try {
    const response = await httpClient.get<
      IGenericResponse<ICustomerOrdersProps[]>
    >(api.admin.customer.orders.product.get(page))
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
  }
}

export const useGetCustomerOrders = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.customer.orders.product.get, page],
    queryFn: () => getCustomerOrders(page)
  })
}
