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
import { usePostVehicleBody } from '@/services/api/api-service/admin/vehicle/vehicle-body';
import ButtonLoader from '@/utils/button-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const vehicleTypeSchema = z.object({
  name: z.string({ required_error: 'Vehicle Make is required.' }),
  image: z
    .any()
    .refine(
      file =>
        (typeof File !== 'undefined' && file instanceof File) ||
        file === undefined,
      { message: 'Please upload a file.' }
    )
});

export type TVehicleTypeSchemaProps = z.infer<typeof vehicleTypeSchema>;

const VehicleType = () => {
  const { mutateAsync, isPending } = usePostVehicleBody();

  const form = useForm<TVehicleTypeSchemaProps>({
    resolver: zodResolver(vehicleTypeSchema)
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('image', file);
    }
  };

  const onSubmit = async (data: TVehicleTypeSchemaProps) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    try {
      await mutateAsync(formData);
      toast.success('Vehicle type added successfully!');
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
          className='max-w-lg mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg'
        >
          <h2 className='text-2xl font-bold text-center text-green-700 mb-6'>
            Add Vehicle Type
          </h2>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-700 font-semibold'>
                  Vehicle Type/Body
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter vehicle type'
                    type='text'
                    {...field}
                    className='mt-2 border-gray-300 focus:border-green-700 focus:ring-green-700 rounded-md'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image'
            render={() => (
              <FormItem>
                <FormLabel className='text-gray-700 font-semibold'>
                  Upload Vehicle Image
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    onChange={e => handleFileChange(e)}
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
                'Add Vehicle Type'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default VehicleType;
