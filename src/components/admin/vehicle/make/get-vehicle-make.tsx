import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useGetVehicleMakeList } from '@/services/api/api-service/admin/vehicle/vehicle-make'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import React from 'react'

const GetVehicleMake = () => {
    const { data: vehicleMakeList, isLoading } = useGetVehicleMakeList()

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search)
        params.set(key, value)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.pushState({}, '', newUrl)
    }

    const handlePageChange = (page: number) => {
        updateQueryParams('page', page.toString())
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className='bg-white rounded-2xl border p-8 shadow-lg'>
                <div className='flex justify-between items-center border-b py-4'>
                    <p className='font-medium text-lg'>Name</p>
                    <p className='font-medium text-lg'>Status</p>
                </div>
                {
                    vehicleMakeList?.data?.data.map((vehicleMake, index) => (
                        <div key={index} className='flex justify-between items-center border-b py-4'>
                            <p>{vehicleMake.name}</p>
                            <p>{vehicleMake.status}</p>
                        </div>
                    ))
                }
                <AutoGlassPagination
                    currentPage={vehicleMakeList?.data?.meta?.current_page || 1}
                    itemsPerPage={vehicleMakeList?.data?.meta.per_page ?? 15}
                    totalItems={vehicleMakeList?.data?.meta.total ?? 100}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default GetVehicleMake