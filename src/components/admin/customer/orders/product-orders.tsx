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

const ProductOrders = () => {
  const { ordersLoading, productOrders, dispatchPending, statusPending, handleCancelOrder, handleDispatchOrder, productMetaData } = useProductOrders()

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
          {
            productOrders?.map((order, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={defaultImage || order.product_image}
                    alt={order.product_name}
                    className='h-[70px] w-full object-cover'
                  />
                </TableCell>
                <TableCell>{order.product_name ?? 'N/A'}</TableCell>
                <TableCell>{order.product_sku ?? 'N/A'}</TableCell>
                <TableCell>{order.product_price ?? 'N/A'}</TableCell>
                <TableCell>Customer name</TableCell>
                <TableCell>Email here</TableCell>
                <TableCell>Address here</TableCell>
                <TableCell>Phone here</TableCell>
                <TableCell>{order.status ?? 'N/A'}</TableCell>
                <TableCell>
                  <div className='flex w-full gap-1 justify-center'>
                    <button
                      disabled={dispatchPending || order.status === 'Dispatched' || order.status === 'Cancelled' || order.status === 'Delivered' || order.status === 'Returned'}
                      onClick={() => handleDispatchOrder(order.id)}
                      className='rounded-full bg-blue-500 px-3 py-1 text-white transition disabled:cursor-not-allowed disabled:bg-blue-400'
                    >
                      {dispatchPending ? <ButtonLoader /> : 'Dispatch'}
                    </button>
                    <button
                      disabled={statusPending || order.status === 'Cancelled' || order.status === 'Returned'}
                      onClick={() => handleCancelOrder(order.id)}
                      className='rounded-full bg-red-500 px-3 py-1 text-white transition disabled:cursor-not-allowed disabled:bg-red-400'
                    >
                      {statusPending ? <ButtonLoader /> : 'Cancel'}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
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
