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
import { usePostVehiclePosition } from '@/services/api/api-service/admin/vehicle/vehicle-position';
import ButtonLoader from '@/utils/button-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const vehicleMakeSchema = z.object({
    name: z.string({ required_error: 'Vehicle Group is required.' })
});

export type TVehicleGroupSchemaProps = z.infer<typeof vehicleMakeSchema>;

const AddVehicleGroup = () => {
    const { mutateAsync, isPending } = usePostVehiclePosition();

    const form = useForm<TVehicleGroupSchemaProps>({
        resolver: zodResolver(vehicleMakeSchema)
    });

    const onSubmit = async (data: TVehicleGroupSchemaProps) => {
        try {
            await mutateAsync(data);
            toast.success('Vehicle Group added successfully!');
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
                    className='max-w-lg mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg'
                >
                    <h2 className='text-2xl font-bold text-center text-green-700 mb-6'>
                        Add Vehicle Group
                    </h2>

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 font-semibold'>
                                    Vehicle Group
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter vehicle group'
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
                                'bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-3 px-6 rounded-md transition-all duration-200',
                                isPending && 'cursor-not-allowed opacity-50'
                            )}
                            disabled={isPending}
                        >
                            {form.formState.isSubmitting ? (
                                <ButtonLoader />
                            ) : (
                                'Add Vehicle Group'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default AddVehicleGroup;
