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
import { usePostVehiclePosition } from '@/services/api/api-service/admin/vehicle/vehicle-position'
import ButtonLoader from '@/utils/button-loader'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const vehicleMakeSchema = z.object({
  name: z.string({ required_error: 'Vehicle Group is required.' })
})

export type TVehicleGroupSchemaProps = z.infer<typeof vehicleMakeSchema>

const VehicleGroup = () => {
  const { mutateAsync, isPending } = usePostVehiclePosition()

  const form = useForm<TVehicleGroupSchemaProps>({
    resolver: zodResolver(vehicleMakeSchema)
  })

  const onSubmit = async (data: TVehicleGroupSchemaProps) => {
    try {
      await mutateAsync(data)
      toast.success('Vehicle Group added successfully!')
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
                <FormLabel>Vehicle Group</FormLabel>
                <FormControl>
                  <Input placeholder='Vehicle Group' {...field} />
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
  )
}

export default VehicleGroup
