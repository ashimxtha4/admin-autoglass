import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useQuoteInquiry } from '@/hooks/admin/quote/inquiry-quote'
import React from 'react'
import QuoteCard from './quote-card'

const QuoteList = () => {
  const { isLoading, quoteList } = useQuoteInquiry()
  return (
    <main className='grid grid-cols-1 gap-4 justify-between lg:grid-cols-2 min-w-fit'>
      {isLoading && <LoadingSpinner />}
      {quoteList?.map(quote => <QuoteCard inquiry={quote} key={quote.id} />)}
    </main>
  )
}

export default QuoteList
