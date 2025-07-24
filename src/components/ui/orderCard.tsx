// components/OrderCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ICustomerOrdersProps } from '@/services/api/api-service/admin/customer/orders/product-orders'
import { baseUrl } from '@/utils/base-url'
import { DEFAULT_IMAGE } from '@/utils/default-image-url'
import ProductStatus from '../admin/customer/orders/product-status'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { useProductOrders } from '@/hooks/admin/orders/product-orders.hooks'
import OrderItem from '../admin/customer/orders/order-item'
import { cn } from '@/lib/utils'

interface Order {
  id: string
  productName: string
  image: string
  quantity: number
  sku: string
  price: number
  orderedBy: string
  address: string
  shippingId: string
  trackingId: string
}

export default function OrderCard({
  order,
  children
}: {
  order: ICustomerOrdersProps
  children?: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='w-full rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md'>
      <div
        className='flex cursor-pointer flex-col items-start justify-between md:flex-row md:items-center'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='flex w-full items-start gap-4'>
          <Image
            src={baseUrl + order.product_image || DEFAULT_IMAGE}
            alt={order.product_name}
            width={80}
            height={80}
            className='rounded-md object-cover'
          />
          <div className='flex-1'>
            <h2 className='text-lg font-semibold'>{order.product_name}</h2>
            <p className='text-sm text-gray-600'>Order ID: {order.id}</p>
            <p className='text-sm text-gray-700'>Qty: {order.quantity}</p>
          </div>
        </div>
        <div className='mt-2 self-end text-sm text-blue-600 md:mt-0 md:hidden'>
          {expanded ? '▲ Hide' : '▼ Details'}
        </div>
      </div>

      {expanded && (
        <div className='mt-4 grid grid-cols-1 gap-4 border-t pt-4 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3'>
          <div>
            <strong>SKU:</strong> {order.product_sku}
          </div>
          <div>
            <strong>Price:</strong> ${order.product_price}
          </div>
          <div>
            <strong>Customer:</strong> {order.customer.name}
          </div>
          <div>
            <strong>Address:</strong> {order.customer.address}
          </div>
          <div>
            <strong>Shipping ID:</strong> {order.shipping_id}
          </div>
          <div>
            <strong>Tracking ID:</strong> {order.tracking_id}
          </div>
          <div>
            <strong>Status:</strong>{' '}
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
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
