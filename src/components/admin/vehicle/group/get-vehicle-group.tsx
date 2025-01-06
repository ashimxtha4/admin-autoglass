import { useGetVehiclePositionList } from '@/services/api/api-service/admin/vehicle/vehicle-position'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const GetVehicleGroup = () => {
    const { data: vehicleMakeGroup, isLoading } = useGetVehiclePositionList()

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
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        vehicleMakeGroup?.data?.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <AutoGlassPagination
                currentPage={vehicleMakeGroup?.data?.meta?.current_page || 1}
                itemsPerPage={vehicleMakeGroup?.data?.meta.per_page ?? 15}
                totalItems={vehicleMakeGroup?.data?.meta.total ?? 100}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default GetVehicleGroup