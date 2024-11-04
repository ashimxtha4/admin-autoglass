import React from 'react'
import { useGetAdminProductList } from '@/services/api/api-service/admin/product/product-list'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import ProductItem from './product-item'
import AutoGlassPagination from '@/utils/autoglass-pagination'

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetAdminProductList()

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set(key, value)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)
  }

  const handlePageChange = (page: number) => {
    updateQueryParams('page', page.toString())
  }

  if (isError) return <div>Something went wrong!</div>

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className='container mx-auto p-4'>
        <h2 className='mb-4 text-2xl font-bold'>Product List</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products?.data?.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
        <AutoGlassPagination
          currentPage={products?.meta?.current_page || 1}
          itemsPerPage={products?.meta.per_page ?? 15}
          totalItems={products?.meta.total ?? 100}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ProductList
