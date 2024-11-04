import React from 'react'
import Image from 'next/image'
import defaultImage from '@/assets/default.png'
import { IProductListProps } from '@/services/api/api-service/admin/product/product-list'

const ProductItem = ({ product }: { product: IProductListProps }) => {
  return (
    <div
      key={product.id}
      className='rounded-lg border p-4 shadow transition hover:shadow-lg'
    >
      <Image
        src={defaultImage || product.image}
        alt={product.name}
        width={250}
        height={160}
        className='mb-4 rounded-md object-cover'
      />
      <div>
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <p className='text-gray-600'>SKU: {product.sku}</p>
        <p className='text-gray-600'>Price: ${product.price ?? '0.00'}</p>
        <p
          className={`mb-2 text-sm font-medium ${
            product.status === 'Available' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          Status: {product.status}
        </p>
        <div className='mt-2 flex justify-between'>
          <div>
            <span className='text-gray-600'>Sydney Stock:</span>{' '}
            {product.syd_stock}
          </div>
          <div>
            <span className='text-gray-600'>Melbourne Stock:</span>{' '}
            {product.mel_stock}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
