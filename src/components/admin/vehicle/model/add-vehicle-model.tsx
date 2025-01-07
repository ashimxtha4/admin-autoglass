'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { usePostVehicleModel } from '@/services/api/api-service/admin/vehicle/vehicle-model';
import { useGetVehicleBody } from '@/services/api/api-service/vehicle/vehicle-body';
// import { useGetVehicleBody } from '@/services/api/api-service/vehicle/vehicle-body';
import { useGetVehicleMake } from '@/services/api/api-service/vehicle/vehicle-make';
import ButtonLoader from '@/utils/button-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const vehicleModelSchema = z.object({
    name: z.string({ required_error: 'Vehicle Model is required.' }),
    vehicle_brand_id: z.string({ required_error: 'Vehicle Make is required.' }),
    vehicle_type_id: z.string().optional()
});

export type TvehicleModelSchemaProps = z.infer<typeof vehicleModelSchema>;

const AddVehicleModel = () => {
    const { mutateAsync, isPending } = usePostVehicleModel();
    const { data: vehicleMakeData, mutateAsync: mutateVehicleMake } = useGetVehicleMake();
    const { data: vehicleTypeData, mutateAsync: mutateVehicleType } = useGetVehicleBody()

    const form = useForm<TvehicleModelSchemaProps>({
        resolver: zodResolver(vehicleModelSchema)
    });

    useEffect(() => {
        (async () => {
            await mutateVehicleMake();
        })()
    }, [mutateVehicleMake]);

    const vehicleMake = form.getValues('vehicle_brand_id');

    useEffect(() => {
        (async () => {
            await mutateVehicleType({ vehicle_brand_id: parseInt(vehicleMake) });
        })()
    }, [mutateVehicleType, !!vehicleMake]);

    const onSubmit = async (data: TvehicleModelSchemaProps) => {
        try {
            await mutateAsync(data);
            toast.success('Vehicle Model added successfully!');
            form.reset();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='rounded-2xl border bg-white p-8 shadow-lg'
                >
                    <h2 className='text-2xl font-bold text-center text-primary-main mb-6'>
                        Add Vehicle Model
                    </h2>

                    {/* Vehicle Model Input */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 font-semibold'>Vehicle Model</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter vehicle model'
                                        {...field}
                                        className='mt-2 border-gray-300 focus:border-green-700 focus:ring-green-700 rounded-md'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Vehicle Brand Select */}
                    <FormField
                        control={form.control}
                        name='vehicle_brand_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 font-semibold'>Vehicle Brand</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='mt-2 border-gray-300 focus:border-green-700 focus:ring-green-700'>
                                            <SelectValue placeholder='Select Vehicle Brand' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {vehicleMakeData?.data?.data?.map(option => (
                                            <SelectItem value={option.id.toString()} key={option.id}>
                                                {option.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Vehicle Type Select */}
                    <FormField
                        control={form.control}
                        name='vehicle_type_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 font-semibold'>Vehicle Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='mt-2 border-gray-300 focus:border-green-700 focus:ring-green-700'>
                                            <SelectValue placeholder='Select Vehicle Type' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.entries(vehicleTypeData?.data?.data ?? {})?.map(([key, value]) => (
                                                <SelectItem value={value.name} key={key}>
                                                    {value.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-center mt-6'>
                        <Button
                            type='submit'
                            variant='default'
                            className={cn(
                                'bg-primary-main hover:bg-primary-main text-white text-lg font-normal py-3 px-6 rounded-full transition-all duration-200',
                                isPending && 'cursor-not-allowed opacity-50'
                            )}
                            disabled={isPending}
                        >
                            {form.formState.isSubmitting ? <ButtonLoader /> : 'Add Vehicle Model'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default AddVehicleModel;
