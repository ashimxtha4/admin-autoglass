import { useProductOrders } from '@/hooks/admin/orders/product-orders.hooks'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import defaultImage from '@/assets/default.png'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
import { baseUrl } from '@/utils/base-url'
import { cn } from '@/lib/utils'
import ProductStatus from './product-status'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import OrderItem from './order-item'


const ProductOrders = () => {
  const {
    ordersLoading,
    productOrders,
    productMetaData,
    form,
    onSubmit,
    orderId,
    setOrderId,
  } = useProductOrders()

  const { handlePageChange } = usePaginationPageChange()

  return (
    <>
      {ordersLoading && <LoadingSpinner />}
      <h2 className='mb-4 text-2xl font-bold'>All Orders</h2>
      <Table className='bg-white rounded-2xl p-4'>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Ordered By</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className='text-nowrap'>Shipping ID</TableHead>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productOrders?.length ? productOrders.map((order, index) => (
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
              <TableCell title='product name'>{order.product_name ?? 'N/A'}</TableCell>
              <TableCell title='product sku'>{order.product_sku ?? 'N/A'}</TableCell>
              <TableCell title='product price'>{order.product_price ?? 'N/A'}</TableCell>
              <TableCell title='customer name'>{order.customer.name ?? 'N/A'}</TableCell>
              <TableCell title='customer address'>{order.customer.address ?? 'N/A'}</TableCell>
              <TableCell title='customer phone'>{order.shipping_id ?? 'N/A'}</TableCell>
              <TableCell title='customer email'>{order.tracking_id ?? 'N/A'}</TableCell>
              <TableCell title='order status'>
                <span
                  className={cn('px-2 py-1 text-white rounded-sm',
                    order.status === 'Dispatched' && 'bg-[#2cde56]',
                    order.status === 'Cancelled' && 'bg-[#ef2c2c]',
                    order.status === 'Ordered' && 'bg-[#2ca6d7]',
                    order.status === 'Returned' && 'bg-[#cfbd21]')}
                >{order.status ?? 'N/A'}</span>
              </TableCell>
              <TableCell>
                <div className='flex w-full gap-1 justify-center'>
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
                  {/* <button
                    title='dispatch order'
                    disabled={dispatchPending || order.status === 'Dispatched' || order.status === 'Cancelled' || order.status === 'Delivered' || order.status === 'Returned'}
                    onClick={() => handleDispatchOrder(order.id)}
                    className='rounded-full bg-blue-500 px-3 py-1 text-white transition disabled:cursor-not-allowed disabled:bg-blue-300'
                  >
                    {dispatchPending ? <ButtonLoader /> : 'Dispatch'}
                  </button>
                  <button
                    title='cancel order'
                    disabled={statusPending || order.status === 'Cancelled' || order.status === 'Returned'}
                    onClick={() => handleCancelOrder(order.id)}
                    className='rounded-full bg-red-500 px-3 py-1 text-white transition disabled:cursor-not-allowed disabled:bg-red-300'
                  >
                    {statusPending ? <ButtonLoader /> : 'Cancel'}
                  </button> */}
                </div>
              </TableCell>
            </TableRow>
          )) : <>No Orders</>
          }
        </TableBody>
      </Table>
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
