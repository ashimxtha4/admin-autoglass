import httpClient from '@/services/api/axios-service'
import { api } from '@/services/endpoints/api.endpoints'
import { useQuery } from '@tanstack/react-query'
import { IQuoteListProps } from './quote-list'

interface IGuoteDetailProps {
  success: boolean
  message: string
  data: IQuoteListProps
}

const getQuoteDetail = async (quoteId: number) => {
  return await httpClient.get<IGuoteDetailProps>(
    api.admin.customer.quote.detail.get(quoteId)
  )
}

export const useGetQuoteDetail = () => {
  return useQuery({
    queryKey: [api.admin.customer.quote.list.get],
    queryFn: () => getQuoteDetail(1),
    select: data => data.data.data
  })
}
