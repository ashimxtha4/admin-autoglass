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
import ButtonLoader from '@/utils/button-loader'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
import { baseUrl } from '@/utils/base-url'
import { cn } from '@/lib/utils'

const ProductOrders = () => {
  const {
    ordersLoading,
    productOrders,
    dispatchPending,
    statusPending,
    handleCancelOrder,
    handleDispatchOrder,
    productMetaData } = useProductOrders()

  const { handlePageChange } = usePaginationPageChange()

  return (
    <>
      {ordersLoading && <LoadingSpinner />}
      <Table className='bg-white rounded-2xl p-4'>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Ordered By</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
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
                  className='h-[70px] w-full object-cover'
                  title='product image'
                />
              </TableCell>
              <TableCell title='product name'>{order.product_name ?? 'N/A'}</TableCell>
              <TableCell title='product sku'>{order.product_sku ?? 'N/A'}</TableCell>
              <TableCell title='product price'>{order.product_price ?? 'N/A'}</TableCell>
              <TableCell title='customer name'>Customer name</TableCell>
              <TableCell title='customer email'>Email here</TableCell>
              <TableCell title='customer address'>Address here</TableCell>
              <TableCell title='customer phone'>Phone here</TableCell>
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
                  <button
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
                  </button>
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
