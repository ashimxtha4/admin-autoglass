import React from 'react'
import { useGetVehicleTypeList } from '@/services/api/api-service/admin/vehicle/vehicle-body'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const GetVehicleType = () => {
    const { data: vehicleTypeList, isLoading } = useGetVehicleTypeList()

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

            <Table className='bg-white rounded-2xl p-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        vehicleTypeList?.data?.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <AutoGlassPagination
                currentPage={vehicleTypeList?.data?.meta?.current_page || 1}
                itemsPerPage={vehicleTypeList?.data?.meta.per_page ?? 15}
                totalItems={vehicleTypeList?.data?.meta.total ?? 100}
                onPageChange={handlePageChange}
            />

        </>
    )
}

export default GetVehicleType