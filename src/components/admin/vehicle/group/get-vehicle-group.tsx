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
import { usePaginationPageChange } from '@/hooks/pagination.hook'
import NotFoundMessage from '../utils/not-found-message'

const GetVehicleGroup = () => {
    const { data: vehicleMakeGroup, isLoading } = useGetVehiclePositionList()

    const { handlePageChange } = usePaginationPageChange()

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
                        vehicleMakeGroup?.data?.data?.length ? vehicleMakeGroup.data.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                            </TableRow>
                        )) : <NotFoundMessage>No Vehicle Group Found</NotFoundMessage>
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