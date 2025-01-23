import React from 'react'
import Image from 'next/image'
import { ICustomerOrdersProps } from '@/services/api/api-service/admin/customer/orders/product-orders'
import defaultImage from '@/assets/default.png'
import { baseUrl } from '@/utils/base-url'
import { cn } from '@/lib/utils'

interface IOrderItemProps {
  order: ICustomerOrdersProps
}

const OrderText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className='mb-1 text-primary-text'>{children}</p>
  )
}

const OrderItem = ({
  order
}: IOrderItemProps) => {
  return (
    <>
      <div className='flex flex-col text-start items-start rounded-lg p-4 hover:shadow-lg'>
        <Image
          src={baseUrl + order.product_image || defaultImage}
          alt={order.product_name}
          width={100}
          height={100}
          className='mb-4 h-fit w-full rounded-md object-cover'
        />
        <h3 className='mb-2 text-lg font-semibold'>{order.product_name ?? 'N/A'}</h3>
        <OrderText>SKU: {order.product_sku ?? 'N/A'}</OrderText>
        <OrderText>Price:  AUS$ {order.product_price ?? 'N/A'}</OrderText>
        <OrderText>Ordered By: {order.customer.name ?? 'N/A'}</OrderText>
        <OrderText>Quantity: {order.quantity ?? 'N/A'}</OrderText>
        <OrderText>Email: {order.customer.email ?? 'N/A'}</OrderText>
        <OrderText>Phone: {order.customer.phone ?? 'N/A'}</OrderText>
        <OrderText>Address: {order.customer.address ?? 'N/A'}</OrderText>
        <OrderText>Shipping ID: {order.shipping_id ?? 'N/A'}</OrderText>
        <OrderText>Tracking ID: {order.tracking_id ?? 'N/A'}</OrderText>
        <OrderText>
          Status: <span className={cn('text-xl rounded-full text-white px-2 py-1', order.status === 'Ordered' ? 'bg-green-500' : 'bg-red-500')}>{order.status}</span>
        </OrderText>
      </div>
    </>
  )
}

export default OrderItem
