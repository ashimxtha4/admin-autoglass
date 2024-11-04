'use client'

import { Button } from '@/components/ui/button'
import { IQuoteListProps } from '@/services/api/api-service/admin/customer/quote/quote-list'
import { usePostQuoteReply } from '@/services/api/api-service/admin/customer/quote/quote-reply'
import ButtonLoader from '@/utils/button-loader'
import { isAxiosError } from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const QuoteCard = ({ inquiry }: { inquiry: IQuoteListProps }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  const { mutateAsync, isPending } = usePostQuoteReply()

  const handleReplyClick = () => {
    setIsReplying(true)
  }

  const handleCancelClick = () => {
    setIsReplying(false)
    setReplyText('')
  }

  const handleSendReply = async (id: number, name: string, email: string) => {
    try {
      await mutateAsync({
        id,
        email,
        name,
        reply: replyText,
        status: 'Replyed'
      })
      toast.success('Quote replied sucessfully!!')
      setIsReplying(false)
      setReplyText('')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className='flex min-w-fit flex-col gap-2 rounded-lg border p-4 shadow transition hover:shadow-lg'>
      <h3 className='text-lg font-semibold'>{inquiry?.name ?? 'N/A'}</h3>
      <p className='text-gray-600'>Phone: {inquiry?.phone ?? 'N/A'}</p>
      <p className='text-nowrap text-gray-600'>
        Email: {inquiry?.email ?? 'N/A'}
      </p>
      <p className='text-gray-600'>Post Code: {inquiry?.post_code ?? 'N/A'}</p>
      <p className='text-gray-600'>
        Preferred Type: {inquiry?.preferred_type ?? 'N/A'}
      </p>
      <p className='text-gray-600'>Make: {inquiry?.make ?? 'N/A'}</p>
      <p className='text-gray-600'>Model: {inquiry?.model ?? 'N/A'}</p>
      <p className='text-gray-600'>Year: {inquiry?.year ?? 'N/A'}</p>
      <p className='text-gray-600'>Body Type: {inquiry?.body_type ?? 'N/A'}</p>
      <p className='text-gray-600'>
        Comments: {inquiry?.additional_comments ?? 'N/A'}
      </p>
      <p className='text-gray-600'>
        Status:{' '}
        <span
          className={`rounded-md p-1 text-white ${inquiry.status === 'Replyed' ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {inquiry?.status ?? 'N/A'}
        </span>
      </p>
      <p className='text-gray-600'>Reply: {inquiry.reply ?? 'N/A'}</p>

      <Button
        onClick={handleReplyClick}
        disabled={inquiry.status === 'Replyed'}
        className={`rounded-md px-4 py-2 text-white transition ${
          inquiry.status === 'Replyed'
            ? 'cursor-not-allowed bg-red-400'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Reply
      </Button>

      {isReplying && (
        <div className='mt-4'>
          <textarea
            className='w-full rounded-md border p-2'
            rows={3}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder='Enter your reply here...'
          />
          <div className='mt-2 flex gap-2'>
            <Button
              disabled={isPending}
              onClick={() =>
                handleSendReply(inquiry.id, inquiry.name, inquiry.email)
              }
              className='rounded-md bg-green-500 text-white transition hover:bg-green-600'
            >
              {isPending && <ButtonLoader />}
              Send Reply
            </Button>
            <Button
              onClick={handleCancelClick}
              className='rounded-md bg-red-500 text-white transition hover:bg-red-600'
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuoteCard
