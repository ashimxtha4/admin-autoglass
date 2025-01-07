import { usePostDispatchProducts } from '@/services/api/api-service/admin/customer/orders/dispatch-products'
import { usePostChangeStatus } from '@/services/api/api-service/admin/customer/orders/order-status'
import { useGetCustomerOrders } from '@/services/api/api-service/admin/customer/orders/product-orders'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

export const useProductOrders = () => {
  const { data, isLoading: ordersLoading } = useGetCustomerOrders()

  const { mutateAsync: mutateStatusAsync, isPending: statusPending } =
    usePostChangeStatus()

  const { mutateAsync: mutateDispatchAsync, isPending: dispatchPending } =
    usePostDispatchProducts()

  const handleDispatchOrder = async (cart_id: number) => {
    try {
      await mutateDispatchAsync({ cart_id, status: 'Dispatched' })
      toast.success('Order dispatched successfully!')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      }
      toast.error('Something went wrong! Try again later')
    }
  }

  const handleCancelOrder = async (cart_id: number) => {
    try {
      await mutateStatusAsync({ cart_id, status: 'Cancelled' })
      toast.success('Order cancelled successfully!')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      }
      toast.error('Something went wrong! Try again later')
    }
  }

  return {
    productOrders: data?.data,
    ordersLoading,
    handleDispatchOrder,
    handleCancelOrder,
    statusPending,
    dispatchPending,
    productMetaData: data?.meta
  }
}
