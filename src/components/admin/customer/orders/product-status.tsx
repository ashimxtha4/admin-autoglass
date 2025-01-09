import React, { SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ICustomerOrdersProps } from '@/services/api/api-service/admin/customer/orders/product-orders'
import { UseFormReturn } from 'react-hook-form'

interface ProductStatusProps {
    orderId: number
    form: UseFormReturn<{
        status: string;
        id?: string | undefined;
    }, any, undefined>
    onSubmit: any
    setOrderId: React.Dispatch<SetStateAction<number | null>>
    openProductStatus: boolean
}

const ProductStatus = ({
    orderId,
    form,
    onSubmit,
    setOrderId,
    openProductStatus,
}: ProductStatusProps) => {
    return (
        <>
            <Dialog open={openProductStatus} onOpenChange={() => openProductStatus ? setOrderId(null) : setOrderId(orderId)}>
                <DialogTrigger asChild>
                    <button onClick={() => setOrderId(orderId)} className='rounded-full bg-blue-500 px-3 py-1 text-white transition disabled:cursor-not-allowed disabled:bg-blue-300'>
                        Update
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 justify-center">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Order Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select order status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Dispatched">Dispatch</SelectItem>
                                                    <SelectItem value="Cancelled">Cancel</SelectItem>
                                                    <SelectItem value="Returned">Return</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProductStatus