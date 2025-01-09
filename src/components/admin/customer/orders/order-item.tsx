import React from 'react'
import Image from 'next/image'
import { ICustomerOrdersProps } from '@/services/api/api-service/admin/customer/orders/product-orders'
import defaultImage from '@/assets/default.png'
import { baseUrl } from '@/utils/base-url'

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
        <h3 className='mb-2 text-lg font-semibold'>{order.product_name}</h3>
        <OrderText>SKU: {order.product_sku}</OrderText>
        <OrderText>Price:  AUS$ {order.product_price}</OrderText>
        <OrderText>Ordered By: {order.customer.name}</OrderText>
        <OrderText>Email: {order.customer.email}</OrderText>
        <OrderText>Phone: {order.customer.phone}</OrderText>
        <OrderText>Address: {order.customer.address}</OrderText>
        <OrderText>Shipping ID: {order.shipping_id}</OrderText>
        <OrderText>Tracking ID: {order.tracking_id}</OrderText>
        <p
          className={`mb-4 text-sm font-medium ${order.status === 'Ordered' ? 'text-green-500' : 'text-red-500'}`}
        >
          Status: {order.status}
        </p>
      </div>
    </>
  )
}

export default OrderItem
