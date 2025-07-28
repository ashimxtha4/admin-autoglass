// components/QuoteListCard.tsx
'use client'

// import { IQuoteListProps } from '@/services/api/api-service/admin/customer/quote/quote-list'
import { IProductListProps } from '@/services/api/api-service/admin/product/product-list'
import { baseUrl } from '@/utils/base-url'
import { DEFAULT_IMAGE } from '@/utils/default-image-url'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({
  product
  // children
}: {
  product: IProductListProps
  // children?: React.ReactNode
}) {
  const getStatusColor = () => {
    switch (product.status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Replied':
        return 'bg-blue-100 text-blue-800'
      case 'Closed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className='w-full space-y-3 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md'>
      <div className='flex w-full items-start gap-4'>
        <Image
          src={baseUrl + product.image || DEFAULT_IMAGE}
          alt={product.name}
          width={80}
          height={80}
          className='rounded-md object-cover'
        />
        <div className='flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
          <div>
            <h2 className='text-lg font-semibold'>{product.name ?? 'N/A'}</h2>
            <p className='text-sm text-gray-500'>{product.mel_stock}</p>
            <p className='text-sm text-gray-500'>${product.price}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor()}`}
          >
            {product.status}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3'>
        <div>
          <strong>Product Suk:</strong> {product.sku}
        </div>
        {/* <div className='col-span-full'>
          <strong>Reply Message:</strong>
          <p className='mt-1 text-gray-600'>{product. ?? 'N/A'}</p>
        </div> */}
      </div>
      <div className='flex flex-wrap gap-2 pt-2'>
        <Link
          href={'?ref=product-details&id=' + product.id}
          className='rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-blue-600'
        >
          Update
        </Link>
        <Link
          href={'?ref=edit-product&id=' + product.id}
          className='rounded-lg bg-green-500 px-4 py-1 text-white hover:bg-green-600'
        >
          Detail
        </Link>
      </div>{' '}
    </div>
  )
}
