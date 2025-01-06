import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useGetVehicleModelList } from '@/services/api/api-service/admin/vehicle/vehicle-model'
import AutoGlassPagination from '@/utils/autoglass-pagination'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const GetVehicleModel = () => {
    const { data: vehicleModelList, isLoading } = useGetVehicleModelList()

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
                        <TableHead>Vehicle Make</TableHead>
                        <TableHead>Vehicle Body Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        vehicleModelList?.data?.data.map((vehicleMake, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicleMake.name}</TableCell>
                                <TableCell>{vehicleMake.vehicle_brand}</TableCell>
                                <TableCell>{vehicleMake.vehicle_type}</TableCell>
                                <TableCell>{vehicleMake.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <AutoGlassPagination
                currentPage={vehicleModelList?.data?.meta?.current_page || 1}
                itemsPerPage={vehicleModelList?.data?.meta.per_page ?? 15}
                totalItems={vehicleModelList?.data?.meta.total ?? 100}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default GetVehicleModel