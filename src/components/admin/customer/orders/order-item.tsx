import React from 'react'
import Image from 'next/image'
import { ICustomerOrdersProps } from '@/services/api/api-service/admin/customer/orders/product-orders'
import defaultImage from '@/assets/default.png'
import ButtonLoader from '@/utils/button-loader'

interface IOrderItemProps {
  order: ICustomerOrdersProps
  handleDispatchOrder: (cart_id: number) => Promise<void>
  handleCancelOrder: (cart_id: number) => Promise<void>
  statusPending: boolean
  dispatchPending: boolean
}

const OrderItem = ({
  order,
  dispatchPending,
  handleCancelOrder,
  handleDispatchOrder,
  statusPending
}: IOrderItemProps) => {
  return (
    <>
      <div className='flex flex-col bg-white items-center rounded-lg border p-4 text-center shadow transition hover:shadow-lg'>
        <Image
          src={defaultImage || order.product_image}
          alt={order.product_name}
          className='mb-4 h-fit w-full rounded-md object-cover'
        />
        <h3 className='mb-2 text-lg font-semibold'>{order.product_name}</h3>
        <p className='mb-1 text-gray-600'>SKU: {order.product_sku}</p>
        <p className='mb-1 text-gray-600'>Price: Rs. {order.product_price}</p>
        <p
          className={`mb-4 text-sm font-medium ${order.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}
        >
          Status: {order.status}
        </p>
        <div className='mt-2 flex w-full justify-around'>
          <button
            disabled={dispatchPending}
            onClick={() => handleDispatchOrder(order.id)}
            className='rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600'
          >
            {dispatchPending ? <ButtonLoader /> : 'Dispatch'}
          </button>
          <button
            disabled={statusPending}
            onClick={() => handleCancelOrder(order.id)}
            className='rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600'
          >
            {statusPending ? <ButtonLoader /> : 'Cancel'}
          </button>
        </div>
      </div>
    </>
  )
}

export default OrderItem
