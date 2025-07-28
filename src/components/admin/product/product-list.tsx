import React from 'react'
import {
  // IProductListProps,
  useGetAdminProductList
} from '@/services/api/api-service/admin/product/product-list'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
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
// import { baseUrl } from '@/utils/base-url'
// import { FaEye, FaEdit } from 'react-icons/fa'
// import Link from 'next/link'
import ProductCard from './productCard'

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetAdminProductList()
  // const dummyProducts: IProductListProps[] = [
  //   {
  //     id: 1,
  //     name: 'Toyota Corolla Front Windshield',
  //     sku: 'TY-FW-001',
  //     price: '250.00',
  //     image: '/images/corolla.png',
  //     status: 'Available',
  //     syd_stock: 12,
  //     mel_stock: 8
  //   },
  //   {
  //     id: 2,
  //     name: 'Honda Civic Rear Windshield',
  //     sku: 'HN-RW-002',
  //     price: '190.00',
  //     image: '/images/civic.png',
  //     status: 'Low Stock',
  //     syd_stock: 3,
  //     mel_stock: 2
  //   },
  //   {
  //     id: 3,
  //     name: 'Ford Ranger Side Glass',
  //     sku: 'FD-SG-003',
  //     price: '145.00',
  //     image: '/images/ranger.png',
  //     status: 'Out of Stock',
  //     syd_stock: 0,
  //     mel_stock: 0
  //   },
  //   {
  //     id: 4,
  //     name: 'Mazda CX-5 Rear Door Glass',
  //     sku: 'MZ-RD-004',
  //     price: '175.00',
  //     image: '/images/cx5.png',
  //     status: 'Available',
  //     syd_stock: 6,
  //     mel_stock: 9
  //   },
  //   {
  //     id: 5,
  //     name: 'Nissan X-Trail Windshield',
  //     sku: 'NS-FW-005',
  //     price: '210.00',
  //     image: '/images/xtrail.png',
  //     status: 'Available',
  //     syd_stock: 10,
  //     mel_stock: 7
  //   }
  // ]

  const { handlePageChange } = usePaginationPageChange()

  if (isError) return <div>Something went wrong!</div>

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h2 className='mb-4 text-2xl font-bold'>Product List</h2>={' '}
      <div className='space-y-4'>
        {products?.data?.length ? (
          products?.data?.map((product, index) => (
            <ProductCard key={index} product={product}>
              {/* Additional children can be passed here if needed */}
            </ProductCard>
          ))
        ) : (
          <>No Products Found</>
        )}
      </div>
      {/* <Table className='rounded-2xl bg-white p-4'>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.data?.length ? (
            products?.data?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={baseUrl + product.image || defaultImage}
                    alt={product.name}
                    width={100}
                    height={70}
                    loading='lazy'
                    className='h-[70px] w-full object-cover'
                    title='product image'
                  />
                </TableCell>
                <TableCell title='product name'>
                  {product.name ?? 'N/A'}
                </TableCell>
                <TableCell title='product sku'>
                  {product.sku ?? 'N/A'}
                </TableCell>
                <TableCell title='product price'>
                  {product.price ?? 'N/A'}
                </TableCell>
                <TableCell title='product status'>
                  {product.status ?? 'N/A'}
                </TableCell>
                <TableCell>
                  <div className='flex w-full justify-center gap-1'>
                    <Link
                      href={'?ref=product-details&id=' + product.id}
                      className='grid place-items-center bg-yellow-600 px-2 py-1'
                    >
                      <FaEye
                        size={18}
                        className='cursor-pointer bg-yellow-600 text-white'
                        title='View'
                      />
                    </Link>
                    <Link
                      href={'?ref=edit-product&id=' + product.id}
                      className='grid place-items-center bg-blue-600 px-2 py-1'
                    >
                      <FaEdit
                        size={18}
                        className='cursor-pointer bg-blue-600 fill-white'
                        title='Edit'
                      />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>No Products Found</>
          )}
        </TableBody>
      </Table> */}
      <AutoGlassPagination
        currentPage={products?.meta?.current_page || 1}
        itemsPerPage={products?.meta?.per_page ?? 15}
        totalItems={products?.meta?.total ?? 100}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ProductList
