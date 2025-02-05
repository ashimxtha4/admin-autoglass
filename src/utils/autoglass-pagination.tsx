import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { FaEllipsis } from "react-icons/fa6";

interface AutoGlassPaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

const AutoGlassPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className
}: AutoGlassPaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page)
      const params = new URLSearchParams(searchParams?.toString())
      params.set('page', page.toString())
      router.push(`${pathname}?${params.toString()}`, { scroll: true })
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1, 2)
      if (currentPage > 3) {
        pageNumbers.push('...')
      }
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage)
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...')
      }
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <Pagination className={cn('my-4', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn('text-primary-text',
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            )}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {renderPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === 'number' ? (
              <PaginationLink
                className={cn(
                  currentPage === page ? 'active cursor-pointer bg-primary-main text-white rounded-full hover:bg-primary-main hover:text-white' : 'cursor-pointer rounded-full text-primary-text'
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            ) : (
              <FaEllipsis size={24} className='px-1 text-primary-text' />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={cn('text-primary-text',
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            )}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default AutoGlassPagination
