import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

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
      // Create new URLSearchParams object
      const params = new URLSearchParams(searchParams?.toString())
      params.set('page', page.toString())

      router.push(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            )}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {/* {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={cn(
                  currentPage === pageNumber ? 'active' : undefined
                )}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })} */}
        <PaginationItem>
          <PaginationNext
            className={cn(
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
