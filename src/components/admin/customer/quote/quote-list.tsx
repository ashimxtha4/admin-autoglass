import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useQuoteInquiry } from '@/hooks/admin/quote/inquiry-quote'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaEye } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import QuoteReplyModal from './quote-reply-modal';
import QuoteCard from './quote-card';
import AutoGlassPagination from '@/utils/autoglass-pagination';
import NotFoundMessage from '../../vehicle/utils/not-found-message';

const QuoteList = () => {

  const { isLoading,
    quoteList,
    quoteMetaData,
    handlePageChange,
    handleCancelClick,
    handleSendReply,
    isPending,
    openReplyModal,
    replyText,
    setOpenReplyModal,
    setReplyText,
    handleOpenReplyModal,
    selectedQuoteId,
  } = useQuoteInquiry()

  return (
    <main className='min-w-fit'>
      {isLoading && <LoadingSpinner />}
      <Table className='bg-white rounded-2xl p-4'>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Prefferred Type</TableHead>
            <TableHead>Reply Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quoteList?.length ?
            quoteList.map((quote, index) => (
              <TableRow key={index}>
                <TableCell title='quote name'>{quote.name ?? 'N/A'}</TableCell>
                <TableCell title='quote phone'>{quote.phone ?? 'N/A'}</TableCell>
                <TableCell title='quote email'>{quote.email ?? 'N/A'}</TableCell>
                <TableCell title='prefferred type'>{quote.preferred_type ?? 'N/A'}</TableCell>
                <TableCell title='reply message'>{quote.reply ?? 'N/A'}</TableCell>
                <TableCell title='quote status'>{quote.status ?? 'N/A'}</TableCell>
                <TableCell>
                  <div className='flex w-full gap-1 justify-center'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type='button'
                          className='bg-yellow-600 grid place-items-center px-2 py-1'>
                          <FaEye
                            size={18}
                            className='text-white bg-yellow-600 cursor-pointer'
                            title='View'
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <QuoteCard inquiry={quote} />
                      </DialogContent>
                    </Dialog>
                    <QuoteReplyModal
                      openReplyModal={openReplyModal}
                      setOpenReplyModal={setOpenReplyModal}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      isPending={isPending}
                      handleSendReply={() => handleSendReply(quote.id, quote.name, quote.email)}
                      handleCancelClick={handleCancelClick}
                      id={quote.id}
                      name={quote.name}
                      email={quote.email}
                      handleOpenReplyModal={() => handleOpenReplyModal(quote.id)}
                      selectedQuoteId={selectedQuoteId}

                    />
                  </div>
                </TableCell>
              </TableRow>
            )) : <NotFoundMessage>No Quotes Found</NotFoundMessage>
          }
        </TableBody>
      </Table>
      <AutoGlassPagination
        currentPage={quoteMetaData?.current_page || 1}
        itemsPerPage={quoteMetaData?.per_page ?? 15}
        totalItems={quoteMetaData?.total ?? 100}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

export default QuoteList
