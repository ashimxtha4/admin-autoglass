import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { IGenericResponse } from '@/utils/generic-data-response'
import { useQuery } from '@tanstack/react-query'

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

const getQuoteList = async () => {
  return await httpClient.get<IGenericResponse<IQuoteListProps[]>>(
    api.admin.customer.quote.list.get
  )
}

export const useGetQuoteList = () => {
  return useQuery({
    queryKey: [api.admin.customer.quote.list.get],
    queryFn: getQuoteList
  })
}
