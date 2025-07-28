import { useGetCustomerList } from '@/services/api/api-service/admin/customer'

export const useUsers = () => {
  const { data, isLoading: ordersLoading } = useGetCustomerList()
  return {
    data,
    ordersLoading
  }
}
