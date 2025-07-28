// components/QuoteListCard.tsx
'use client'

import { IQuoteListProps } from '@/services/api/api-service/admin/customer/quote/quote-list'

// interface Quote {
//   id: string
//   customerName: string
//   phone: string
//   email: string
//   preferredType: string
//   replyMessage: string
//   status: 'Pending' | 'Replied' | 'Closed'
// }

export default function QuoteListCard({
  quote,
  children
}: {
  quote: IQuoteListProps
  children?: React.ReactNode
}) {
  const getStatusColor = () => {
    switch (quote.status) {
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
      <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
        <div>
          <h2 className='text-lg font-semibold'>{quote.name ?? 'N/A'}</h2>
          <p className='text-sm text-gray-500'>{quote.email}</p>
          <p className='text-sm text-gray-500'>{quote.phone}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor()}`}
        >
          {quote.status}
        </span>
      </div>

      <div className='grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3'>
        <div>
          <strong>Preferred Type:</strong> {quote.preferred_type}
        </div>
        <div className='col-span-full'>
          <strong>Reply Message:</strong>
          <p className='mt-1 text-gray-600'>{quote.reply ?? 'N/A'}</p>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 pt-2'>
        {/* <button className='rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-blue-600'>
          Update
        </button>
        <button className='rounded-lg bg-green-500 px-4 py-1 text-white hover:bg-green-600'>
          Detail
        </button> */}
        {children}
      </div>
    </div>
  )
}
