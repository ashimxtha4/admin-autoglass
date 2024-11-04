import { useProductOrders } from '@/hooks/admin/orders/product-orders.hooks'
import OrderItem from './order-item'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ProductOrders = () => {
  const { ordersLoading, productOrders, ...rest } = useProductOrders()

  return (
    <main className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {ordersLoading && <LoadingSpinner />}
      {productOrders?.map(order => (
        <OrderItem order={order} key={order.id} {...rest} />
      ))}
    </main>
  )
}

export default ProductOrders
