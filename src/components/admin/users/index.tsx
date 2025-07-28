import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { usePaginationPageChange } from '@/hooks/pagination.hook'
import { useGetCustomerList } from '@/services/api/api-service/admin/customer'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { useState } from 'react'

export default function Users() {
  const { handlePageChange } = usePaginationPageChange()
  const [openId, setOpenId] = useState<number | null>(null)
  const { data: users, isLoading: ordersLoading } = useGetCustomerList()

  console.log('🚀 ~ Users ~ data:', users)
  return (
    <div className=''>
      <h1 className='mb-4 text-2xl font-bold'>All Users</h1>
      {ordersLoading && <LoadingSpinner />}
      {users?.data?.length ? (
        users?.data.map(user => (
          <div
            key={user.id}
            className='mb-4 cursor-pointer rounded-lg bg-white shadow-md'
            onClick={() => setOpenId(openId === user.id ? null : user.id)}
          >
            <div className='flex flex-col items-start justify-between p-4 md:flex-row md:items-center'>
              <div>
                <h2 className='text-lg font-semibold'>
                  {user.first_name} {user.middle_name ?? ''} {user.last_name}
                </h2>
                <p className='text-sm text-gray-600'>Email: {user.email}</p>
                <p className='text-sm text-gray-600'>Phone: {user.phone}</p>
                <p className='text-sm text-gray-600'>Address: {user.address}</p>
                <p className='text-sm text-gray-600'>UID: {user.uid}</p>
              </div>

              <div className='mt-4 flex flex-col items-start gap-2 md:mt-0'>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${user.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                >
                  Status: {user.status}
                </span>
                {/* <button
                onClick={() => setOpenId(openId === user.id ? null : user.id)}
                className='rounded bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600'
              >
                {openId === user.id ? 'Hide Details' : 'View Details'}
              </button> */}
              </div>
            </div>

            {openId === user.id && (
              <div className='border-t bg-gray-50 px-6 py-4 text-sm text-gray-700'>
                {/* <p>
                OTP: <span className='font-mono'>{user.otp}</span>
              </p> */}
                <p>
                  Password Hash:{' '}
                  <span className='font-mono'>{user.password}</span>
                </p>
                <p>
                  Password (Plain):{' '}
                  <span className='text-red-600'>{user.password_text}</span>
                </p>
                <p>Created At: {new Date(user.created_at).toLocaleString()}</p>
                <p>Updated At: {new Date(user.updated_at).toLocaleString()}</p>
                {user.social_id && <p>Social ID: {user.social_id}</p>}
                {user.deleted_at && (
                  <p className='text-red-500'>Deleted At: {user.deleted_at}</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <>No users found</>
      )}
      <AutoGlassPagination
        currentPage={users?.meta?.current_page || 1}
        itemsPerPage={users?.meta?.per_page ?? 15}
        totalItems={users?.meta?.total ?? 100}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
