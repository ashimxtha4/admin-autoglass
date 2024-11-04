import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export interface IProductListProps {
  id: number
  name: string
  sku: string
  price: string
  image: string
  status: string
  syd_stock: number
  mel_stock: number
}

// get vehicle make list
const getProductList = async (page: number) => {
  return await httpClient.get<IGenericResponse<IProductListProps[]>>(
    api.admin.product.list.get(page)
  )
}

export const useGetAdminProductList = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.product.list.get, page],
    queryFn: () => getProductList(page),
    select: data => data.data
  })
}
