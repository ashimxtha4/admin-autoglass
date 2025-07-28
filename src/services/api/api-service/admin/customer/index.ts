import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface User {
  id: number
  first_name: string
  middle_name: string | null
  last_name: string
  email: string
  phone: string
  address: string
  uid: string
  status: 'verified' | 'unverified' | string // extend with more status types if needed
  otp: string
  password: string
  password_text: string
  social_id: string | null
  created_at: string // ISO 8601 timestamp
  updated_at: string
  deleted_at: string | null
}

const getCustomerList = async (page: number) => {
  try {
    const response = await httpClient.get<IGenericResponse<User[]>>(
      api.admin.customer.list.get(page)
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    throw error
  }
}

export const useGetCustomerList = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.customer.orders.product.get, page],
    queryFn: () => getCustomerList(page),
    select: data => data
  })
}
