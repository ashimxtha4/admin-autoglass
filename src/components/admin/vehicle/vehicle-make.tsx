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

const VehicleMake = () => {
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
          className='space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg max-w-lg mx-auto'
        >
          <h2 className='text-2xl font-bold text-center text-green-700 mb-6'>
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
                'bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-3 px-6 rounded-md transition-all duration-200',
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

export default VehicleMake;
