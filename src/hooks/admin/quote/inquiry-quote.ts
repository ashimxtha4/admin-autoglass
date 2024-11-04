import { useGetQuoteList } from '@/services/api/api-service/admin/customer/quote/quote-list'

export const useQuoteInquiry = () => {
  const { data, isLoading } = useGetQuoteList()

  return {
    quoteList: data?.data.data,
    isLoading
  }
}
