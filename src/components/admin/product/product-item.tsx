import React from 'react'
import Image from 'next/image'
import defaultImage from '@/assets/default.png'
import { IProductListProps } from '@/services/api/api-service/admin/product/product-list'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const ProductItem = ({ product }: { product: IProductListProps }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => { router.push('?ref=product-details&id=' + product.id) }}
      key={product.id}
      className='rounded-lg border border-gray-400 p-4 shadow transition hover:shadow-lg cursor-pointer'
    >
      <Image
        src={defaultImage || product.image}
        alt={product.name}
        width={250}
        height={160}
        className='mb-4 w-full self-center rounded-md object-cover'
      />
      <div>
        <h3 className='text-base font-medium'>{product.name}</h3>
        <p className='text-primary-text/70'>SKU: {product.sku}</p>
        <p className='text-primary-text/70'>Price: ${product.price ?? 'N/A'}</p>
        <p
          className='mb-2 text-primary-text/70'
        >
          Status: <span className={cn(product.status === 'ENABLED' ? 'text-primary-main' : 'text-red-500')}> {product.status}</span>
        </p>
        <div className='mt-2 flex flex-col'>
          <div>
            <span className='text-primary-text/70'>Sydney Stock:</span>{' '}
            {product.syd_stock ?? 'N/A'}
          </div>
          <div>
            <span className='text-primary-text/70'>Melbourne Stock:</span>{' '}
            {product.mel_stock ?? 'N/A'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
