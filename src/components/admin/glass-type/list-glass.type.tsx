import React from 'react'
import { useGetGlassTypeList } from '@/services/api/api-service/admin/glass-type/glass-type-list'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils'

const ListGlassType = () => {

    const { data: glassTypesData, isLoading } = useGetGlassTypeList()

    console.log(glassTypesData?.data?.data, 'glassTypesData');


    return (
        <section>
            <Table>
                <TableCaption>Glass Type List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {glassTypesData?.data?.data?.map((glass) => (
                        <TableRow key={glass.id}>
                            <TableCell className="font-medium">{glass.name ?? 'N/A'}</TableCell>
                            <TableCell className={cn(glass.status === 'ENABLED' ? 'text-primary-main' : 'text-red-500')}>{glass.status ?? 'N/A'}</TableCell>
                            <TableCell>{glass.size ?? 'N/A'}</TableCell>
                            <TableCell className="text-right">{glass.description ?? 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}

export default ListGlassType