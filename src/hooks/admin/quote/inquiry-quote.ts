import { usePaginationPageChange } from '@/hooks/pagination.hook'
import { useGetQuoteList } from '@/services/api/api-service/admin/customer/quote/quote-list'
import { usePostQuoteReply } from '@/services/api/api-service/admin/customer/quote/quote-reply'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const useQuoteInquiry = () => {
  const [openReplyModal, setOpenReplyModal] = useState(false)
  const [replyText, setReplyText] = useState('')

  const { data, isLoading } = useGetQuoteList()
  const { handlePageChange } = usePaginationPageChange()
  const { mutateAsync, isPending } = usePostQuoteReply()

  const handleCancelClick = () => {
    setOpenReplyModal(false)
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
      setOpenReplyModal(false)
      setReplyText('')
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return {
    quoteList: data?.data.data,
    quoteMetaData: data?.data.meta,
    isLoading,
    handlePageChange,
    openReplyModal,
    setOpenReplyModal,
    replyText,
    setReplyText,
    handleCancelClick,
    handleSendReply,
    isPending
  }
}
