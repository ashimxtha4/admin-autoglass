import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export interface IQuoteListProps {
  id: number
  name: string
  phone: string
  email: string
  post_code: string
  preferred_type: string
  make: string
  model: string
  year: string
  body_type: string
  additional_comments: string
  reply: string
  status: string
  created_at: string
  updated_at: string
}

const getQuoteList = async (page: number) => {
  return await httpClient.get<IGenericResponse<IQuoteListProps[]>>(
    api.admin.customer.quote.list.get(page)
  )
}

export const useGetQuoteList = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get('page') || '1')
  return useQuery({
    queryKey: [api.admin.customer.quote.list.get, page],
    queryFn: () => getQuoteList(page)
  })
}
