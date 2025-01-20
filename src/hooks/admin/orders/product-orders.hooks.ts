import { usePostDispatchProducts } from '@/services/api/api-service/admin/customer/orders/dispatch-products'
import { usePostChangeStatus } from '@/services/api/api-service/admin/customer/orders/order-status'
import { useGetCustomerOrders } from '@/services/api/api-service/admin/customer/orders/product-orders'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export const OrderStatusSchema = z.object({
  id: z.string().optional(),
  status: z.string({ required_error: 'Order status is required' })
})

export const useProductOrders = () => {
  const [orderId, setOrderId] = useState<number | null>(null)
  const { data, isLoading: ordersLoading } = useGetCustomerOrders()

  const { mutateAsync: mutateStatusAsync, isPending: statusPending } =
    usePostChangeStatus()

  const { mutateAsync: mutateDispatchAsync, isPending: dispatchPending } =
    usePostDispatchProducts()

  const form = useForm<z.infer<typeof OrderStatusSchema>>({
    resolver: zodResolver(OrderStatusSchema)
  })

  const onSubmit = async (data: z.infer<typeof OrderStatusSchema>) => {
    const dataToSubmit = {
      id: orderId,
      status: data.status
    }
    try {
      if (dataToSubmit.status === 'Dispatched') {
        await mutateDispatchAsync({
          cart_id: dataToSubmit.id as number,
          status: dataToSubmit.status
        })
        toast.success(`Order ${data.status} successfully!`)
        setOrderId(null)
        form.reset()
        return
      }
      await mutateStatusAsync({
        cart_id: dataToSubmit.id as number,
        status: dataToSubmit.status
      })
      toast.success(`Order ${data.status} successfully!`)
      setOrderId(null)
      form.reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      }
      toast.error('Something went wrong! Try again later')
    }
  }

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
    productMetaData: data?.meta,
    form,
    orderId,
    setOrderId,
    onSubmit
  }
}
