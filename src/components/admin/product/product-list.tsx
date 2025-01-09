import React from 'react'
import { useGetAdminProductList } from '@/services/api/api-service/admin/product/product-list'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
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
import { baseUrl } from '@/utils/base-url'
import { FaEye, FaEdit } from "react-icons/fa";
import Link from 'next/link'

const ProductList = () => {

  const { data: products, isLoading, isError } = useGetAdminProductList()

  const { handlePageChange } = usePaginationPageChange()

  if (isError) return <div>Something went wrong!</div>

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className='container mx-auto p-4'>
        <h2 className='mb-4 text-2xl font-bold'>Product List</h2>
        <Table className='bg-white rounded-2xl p-4'>
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
            {
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
                  <TableCell title='product name'>{product.name ?? 'N/A'}</TableCell>
                  <TableCell title='product sku'>{product.sku ?? 'N/A'}</TableCell>
                  <TableCell title='product price'>{product.price ?? 'N/A'}</TableCell>
                  <TableCell title='product status'>{product.status ?? 'N/A'}</TableCell>
                  <TableCell>
                    <div className='flex w-full gap-1 justify-center'>
                      <Link
                        href={'?ref=product-details&id=' + product.id}
                        className='bg-yellow-600 grid place-items-center px-2 py-1'>
                        <FaEye
                          size={18}
                          className='text-white bg-yellow-600 cursor-pointer'
                          title='View'
                        />
                      </Link>
                      <Link
                        href={'?ref=edit-product&id=' + product.id}
                        className='bg-blue-600 grid place-items-center px-2 py-1'>
                        <FaEdit
                          size={18}
                          className='bg-blue-600 fill-white cursor-pointer'
                          title='Edit'
                        />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <AutoGlassPagination
          currentPage={products?.meta?.current_page || 1}
          itemsPerPage={products?.meta?.per_page ?? 15}
          totalItems={products?.meta?.total ?? 100}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ProductList
