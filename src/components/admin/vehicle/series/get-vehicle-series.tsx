import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetVehicleSeriesList } from '@/services/api/api-service/admin/vehicle/vehicle-series'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import { usePaginationPageChange } from '@/hooks/pagination.hook'

const GetVehicleSeries = () => {
    const { data: vehicleSeriesList, isLoading } = useGetVehicleSeriesList()

    const { handlePageChange } = usePaginationPageChange()

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <Table className='bg-white rounded-2xl p-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Vehicle Model</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        vehicleSeriesList?.data?.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.vechicle_model}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                                <TableCell>{vehicleMake.start_date ?? 'N/A'}</TableCell>
                                <TableCell>{vehicleMake.end_date ?? 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <AutoGlassPagination
                currentPage={vehicleSeriesList?.data?.meta?.current_page || 1}
                itemsPerPage={vehicleSeriesList?.data?.meta.per_page ?? 15}
                totalItems={vehicleSeriesList?.data?.meta.total ?? 100}
                onPageChange={handlePageChange}
            />

        </>
    )
}

export default GetVehicleSeries