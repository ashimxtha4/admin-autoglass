'use client'

import React from 'react'
import { IQuoteListProps } from '@/services/api/api-service/admin/customer/quote/quote-list'

const QuoteCard = ({ inquiry }: { inquiry: IQuoteListProps }) => {

  return (
    <>
      <h3 className='text-lg font-semibold'>{inquiry?.name ?? 'N/A'}</h3>
      <p className='text-primary-text/80'>Phone: {inquiry?.phone ?? 'N/A'}</p>
      <p className='text-nowrap text-primary-text/80'>
        Email: {inquiry?.email ?? 'N/A'}
      </p>
      <p className='text-primary-text/80'>Post Code: {inquiry?.post_code ?? 'N/A'}</p>
      <p className='text-primary-text/80'>
        Preferred Type: {inquiry?.preferred_type ?? 'N/A'}
      </p>
      <p className='text-primary-text/80'>Make: {inquiry?.make ?? 'N/A'}</p>
      <p className='text-primary-text/80'>Model: {inquiry?.model ?? 'N/A'}</p>
      <p className='text-primary-text/80'>Year: {inquiry?.year ?? 'N/A'}</p>
      <p className='text-primary-text/80'>Body Type: {inquiry?.body_type ?? 'N/A'}</p>
      <p className='text-primary-text/80'>
        Comments: {inquiry?.additional_comments ?? 'N/A'}
      </p>
      <p className='text-primary-text/80'>
        Status:{' '}
        <span
          className={`rounded-md p-1 text-white ${inquiry.status === 'Replyed' ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {inquiry?.status ?? 'N/A'}
        </span>
      </p>
      <p className='text-primary-text/80'>Reply: {inquiry.reply ?? 'N/A'}</p>
    </>
  )
}

export default QuoteCard
