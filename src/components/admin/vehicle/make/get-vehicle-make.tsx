import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useGetVehicleMakeList } from '@/services/api/api-service/admin/vehicle/vehicle-make'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { usePaginationPageChange } from '@/hooks/pagination.hook'

const GetVehicleMake = () => {
    const { data: vehicleMakeList, isLoading } = useGetVehicleMakeList()

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
                        vehicleMakeList?.data?.data?.length ? vehicleMakeList.data.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                            </TableRow>
                        )) : <>No Vehicle Make Found</>
                    }
                </TableBody>
            </Table>
            <AutoGlassPagination
                currentPage={vehicleMakeList?.data?.meta?.current_page || 1}
                itemsPerPage={vehicleMakeList?.data?.meta.per_page ?? 15}
                totalItems={vehicleMakeList?.data?.meta.total ?? 100}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default GetVehicleMake