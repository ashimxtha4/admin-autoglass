'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePostVehicleMake } from '@/services/api/api-service/admin/vehicle/vehicle-make'
import ButtonLoader from '@/utils/button-loader'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const vehicleMakeSchema = z.object({
  name: z.string({ required_error: 'Vehicle Make is required.' })
})

export type TVehicleMakeSchemaProps = z.infer<typeof vehicleMakeSchema>

const VehicleMake = () => {
  const { mutateAsync, isPending } = usePostVehicleMake()

  const form = useForm<TVehicleMakeSchemaProps>({
    resolver: zodResolver(vehicleMakeSchema)
  })

  const onSubmit = async (data: TVehicleMakeSchemaProps) => {
    try {
      await mutateAsync(data)
      toast.success('Vehicle Make added successfully!')
      form.reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 rounded-lg border border-gray-500 p-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Make</FormLabel>
                <FormControl>
                  <Input placeholder='Vehicle make' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='!mt-2 flex gap-2 md:!mt-4'>
            <Button
              type='submit'
              variant='default'
              className={cn(
                'bg-primary-main text-lg font-semibold text-white hover:bg-primary-dark md:text-xl',
                isPending && 'cursor-not-allowed'
              )}
              disabled={isPending}
            >
              {form.formState.isSubmitting ? <ButtonLoader /> : 'Add Vehicle Make'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default VehicleMake
