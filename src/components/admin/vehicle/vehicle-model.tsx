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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { usePostVehicleModel } from '@/services/api/api-service/admin/vehicle/vehicle-model'
import { useGetVehicleBody } from '@/services/api/api-service/vehicle/vehicle-body'
import { useGetVehicleMake } from '@/services/api/api-service/vehicle/vehicle-make'
import ButtonLoader from '@/utils/button-loader'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const vehicleModelSchema = z.object({
  name: z.string({ required_error: 'Vehicle Model is required.' }),
  vehicle_brand_id: z.string({ required_error: 'Vehicle Make is required.' }),
  vehicle_type_id: z.string({ required_error: 'Vehicle Type is required.' })
})

export type TvehicleModelSchemaProps = z.infer<typeof vehicleModelSchema>

const VehicleModel = () => {
  const { mutateAsync, isPending } = usePostVehicleModel()
  const { data: vehicleMakeData, mutateAsync: mutateVehicleMake } =
    useGetVehicleMake()

  const { data: vehicleBodyData, mutateAsync: mutateVehicleBody } =
    useGetVehicleBody()

  useEffect(() => {
    mutateVehicleMake()
    mutateVehicleBody()
  }, [mutateVehicleMake, mutateVehicleBody])

  const form = useForm<TvehicleModelSchemaProps>({
    resolver: zodResolver(vehicleModelSchema)
  })

  const onSubmit = async (data: TvehicleModelSchemaProps) => {
    try {
      await mutateAsync(data)
      toast.success('Vehicle Model added successfully!')
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
          <FormField
            control={form.control}
            name='vehicle_brand_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
          <FormField
            control={form.control}
            name='vehicle_type_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Vehicle type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleBodyData?.data?.data?.map(option => (
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
                'Add Vehicle Model'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default VehicleModel
