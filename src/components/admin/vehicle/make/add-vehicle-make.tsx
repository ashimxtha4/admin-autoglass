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
import { cn } from '@/lib/utils';
import { usePostVehicleMake } from '@/services/api/api-service/admin/vehicle/vehicle-make';
import ButtonLoader from '@/utils/button-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const vehicleMakeSchema = z.object({
    name: z.string({ required_error: 'Vehicle Make is required.' })
});

export type TVehicleMakeSchemaProps = z.infer<typeof vehicleMakeSchema>;

const AddVehicleMake = () => {
    const { mutateAsync, isPending } = usePostVehicleMake();

    const form = useForm<TVehicleMakeSchemaProps>({
        resolver: zodResolver(vehicleMakeSchema)
    });

    const onSubmit = async (data: TVehicleMakeSchemaProps) => {
        try {
            await mutateAsync(data);
            toast.success('Vehicle Make added successfully!');
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
                    className='w-full rounded-2xl border bg-white p-8 shadow-lg'
                >
                    <h2 className='text-2xl font-bold text-center text-primary-main mb-6'>
                        Add Vehicle Make
                    </h2>

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 font-semibold'>Vehicle Make</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter vehicle make'
                                        {...field}
                                        className='mt-2 border-gray-300 focus:border-green-700 focus:ring-green-700 rounded-md'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-center mt-6'>
                        <Button
                            type='submit'
                            variant='default'
                            className={cn(
                                'bg-primary-main hover:bg-primary-main rounded-full text-white text-lg font-normal py-3 px-6 transition-all duration-200',
                                isPending && 'cursor-not-allowed opacity-50'
                            )}
                            disabled={isPending}
                        >
                            {form.formState.isSubmitting ? <ButtonLoader /> : 'Add Vehicle Make'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default AddVehicleMake;
