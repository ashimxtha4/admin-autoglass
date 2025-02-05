import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ButtonLoader from '@/utils/button-loader'
import React from 'react'
import { FaReply } from 'react-icons/fa'

interface QuoteReplyModalProps {
    openReplyModal: boolean
    setOpenReplyModal: React.Dispatch<React.SetStateAction<boolean>>
    replyText: string
    setReplyText: React.Dispatch<React.SetStateAction<string>>
    isPending: boolean
    handleSendReply: (id: number, name: string, email: string) => Promise<string | undefined>
    handleCancelClick: () => void
    id: number
    name: string
    email: string
    selectedQuoteId: number | null
    handleOpenReplyModal: (quoteId: number) => void
}

const QuoteReplyModal = ({
    handleCancelClick,
    handleSendReply,
    isPending,
    openReplyModal,
    replyText,
    setOpenReplyModal,
    setReplyText,
    id,
    name,
    email,
    handleOpenReplyModal,
    selectedQuoteId
}: QuoteReplyModalProps
) => {
    return (
        <Dialog open={openReplyModal} onOpenChange={setOpenReplyModal}>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className='bg-blue-600 grid place-items-center px-2 py-1'
                    onClick={() => handleOpenReplyModal(id)}
                >
                    <FaReply
                        size={18}
                        className='bg-blue-600 fill-white cursor-pointer'
                        title='Reply'
                    />
                </button>
            </DialogTrigger>
            {
                selectedQuoteId === id && <DialogContent className="sm:max-w-[425px]">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSendReply(id, name, email)
                        }}
                        className='mt-4'>
                        <textarea
                            className='w-full rounded-md border p-2'
                            rows={3}
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            placeholder='Enter quote reply here...'
                        />
                        <div className='mt-2 flex gap-2'>
                            <button
                                type='submit'
                                disabled={isPending}
                                className='rounded-md min-w-[60px] bg-primary-main px-2 py-1 text-white transition'
                            >
                                {isPending ? <ButtonLoader /> : 'Send Reply'}
                            </button>
                            <button
                                type='button'
                                onClick={handleCancelClick}
                                className='rounded-md bg-red-500 text-white transition px-2 py-1'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </DialogContent>
            }
        </Dialog>
    )
}

export default QuoteReplyModal