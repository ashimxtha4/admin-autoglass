import { useProductOrders } from '@/hooks/admin/orders/product-orders.hooks'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'
// import Image from 'next/image'
// import defaultImage from '@/assets/default.png'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
// import { baseUrl } from '@/utils/base-url'
// import { cn } from '@/lib/utils'
import ProductStatus from './product-status'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import OrderItem from './order-item'
import OrderTypes from './order-types'
import { useSearchParams } from 'next/navigation'
import NotFoundMessage from '../../vehicle/utils/not-found-message'
import OrderCard from '@/components/ui/orderCard'

const ProductOrders = () => {
  const searchParams = useSearchParams()

  const {
    ordersLoading,
    productOrders,
    productMetaData,
    form,
    onSubmit,
    orderId,
    setOrderId
  } = useProductOrders()

  const { handlePageChange } = usePaginationPageChange()

  const getNoOrdersMessage = () => {
    if (searchParams.get('ordered')) return 'No new orders'
    if (searchParams.get('dispatched')) return 'No dispatched orders'
    if (searchParams.get('cancelled')) return 'No cancelled orders'
    if (searchParams.get('returned')) return 'No returned orders'
    return 'No orders available'
  }

  return (
    <>
      {ordersLoading && <LoadingSpinner />}
      <h2 className='mb-4 text-2xl font-bold'>All Orders</h2>
      <OrderTypes />
      <div className='overflow-x-auto my-6'>
        <div className='space-y-4'>
          {productOrders?.length ? (
            productOrders
              .filter(order => {
                if (
                  !searchParams.get('ordered') &&
                  !searchParams.get('dispatched') &&
                  !searchParams.get('cancelled') &&
                  !searchParams.get('returned')
                ) {
                  return true
                }
                if (searchParams.get('ordered') && order.status === 'Ordered')
                  return true
                if (
                  searchParams.get('dispatched') &&
                  order.status === 'Dispatched'
                )
                  return true
                if (
                  searchParams.get('cancelled') &&
                  order.status === 'Cancelled'
                )
                  return true
                if (searchParams.get('returned') && order.status === 'Returned')
                  return true

                return false
              })
              .map((order) => (
                <OrderCard key={order.id} order={order}>
                  <>
                    <div className='col-span-full flex flex-wrap gap-2 pt-2'>
                      <ProductStatus
                        orderId={order.id}
                        form={form}
                        onSubmit={onSubmit}
                        setOrderId={setOrderId}
                        openProductStatus={order.id === orderId}
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            title='order detail'
                            className='rounded-full bg-primary-main px-3 py-1 text-white transition'
                          >
                            Detail
                          </button>
                        </DialogTrigger>
                        <DialogContent className='max-h-[500px] overflow-y-auto'>
                          <OrderItem order={order} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                </OrderCard>
              ))
          ) : (
            <NotFoundMessage>{getNoOrdersMessage()}</NotFoundMessage>
          )}
        </div>
        {/* <Table className='rounded-2xl bg-white p-4'>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Ordered By</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Shipping ID</TableHead>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productOrders?.length ? (
              productOrders
                .filter(order => {
                  if (
                    !searchParams.get('ordered') &&
                    !searchParams.get('dispatched') &&
                    !searchParams.get('cancelled') &&
                    !searchParams.get('returned')
                  ) {
                    return true
                  }
                  if (searchParams.get('ordered') && order.status === 'Ordered')
                    return true
                  if (
                    searchParams.get('dispatched') &&
                    order.status === 'Dispatched'
                  )
                    return true
                  if (
                    searchParams.get('cancelled') &&
                    order.status === 'Cancelled'
                  )
                    return true
                  if (
                    searchParams.get('returned') &&
                    order.status === 'Returned'
                  )
                    return true

                  return false
                })
                .map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        src={baseUrl + order.product_image || defaultImage}
                        alt={order.product_name}
                        width={100}
                        height={70}
                        className='h-[50px] w-full object-cover'
                        title='product image'
                      />
                    </TableCell>
                    <TableCell title='product name'>
                      {order.product_name ?? 'N/A'}
                    </TableCell>
                    <TableCell title='product sku'>
                      {order.product_sku ?? 'N/A'}
                    </TableCell>
                    <TableCell title='product price'>
                      {order.product_price ?? 'N/A'}
                    </TableCell>
                    <TableCell title='customer name'>
                      {order.customer.name ?? 'N/A'}
                    </TableCell>
                    <TableCell title='quantity'>
                      {order.quantity ?? 'N/A'}
                    </TableCell>
                    <TableCell title='customer address'>
                      {order.customer.address ?? 'N/A'}
                    </TableCell>
                    <TableCell title='customer phone'>
                      {order.shipping_id ?? 'N/A'}
                    </TableCell>
                    <TableCell title='customer email'>
                      {order.tracking_id ?? 'N/A'}
                    </TableCell>
                    <TableCell title='order status'>
                      <span
                        className={cn(
                          'rounded-sm px-2 py-1 text-white',
                          order.status === 'Dispatched' && 'bg-[#2cde56]',
                          order.status === 'Cancelled' && 'bg-[#ef2c2c]',
                          order.status === 'Ordered' && 'bg-[#2ca6d7]',
                          order.status === 'Returned' && 'bg-[#cfbd21]'
                        )}
                      >
                        {order.status ?? 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex w-full justify-center gap-1'>
                        <ProductStatus
                          orderId={order.id}
                          form={form}
                          onSubmit={onSubmit}
                          setOrderId={setOrderId}
                          openProductStatus={order.id === orderId}
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              title='order detail'
                              className='rounded-full bg-primary-main px-3 py-1 text-white transition'
                            >
                              Detail
                            </button>
                          </DialogTrigger>
                          <DialogContent className='max-h-[500px] overflow-y-auto'>
                            <OrderItem order={order} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <NotFoundMessage>{getNoOrdersMessage()}</NotFoundMessage>
            )}
          </TableBody>
        </Table> */}
      </div>
      <AutoGlassPagination
        currentPage={productMetaData?.current_page || 1}
        itemsPerPage={productMetaData?.per_page ?? 15}
        totalItems={productMetaData?.total ?? 100}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ProductOrders
