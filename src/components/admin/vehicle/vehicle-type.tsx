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
import { usePostVehicleBody } from '@/services/api/api-service/admin/vehicle/vehicle-body'
import ButtonLoader from '@/utils/button-loader'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

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
})

export type TVehicleTypeSchemaProps = z.infer<typeof vehicleTypeSchema>

const VehicleType = () => {
  const { mutateAsync, isPending } = usePostVehicleBody()

  const form = useForm<TVehicleTypeSchemaProps>({
    resolver: zodResolver(vehicleTypeSchema)
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue('image', file)
    }
  }

  const onSubmit = async (data: TVehicleTypeSchemaProps) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('image', data.image)
    try {
      await mutateAsync(formData)
      toast.success('Vehicle type added successfully!')
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
                <FormLabel>Vehicle Type/Body</FormLabel>
                <FormControl>
                  <Input placeholder='Vehicle Type' type='text' {...field} />
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
                <FormLabel>Vehicle Image</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    placeholder='Vehicle Image'
                    onChange={e => handleFileChange(e)}
                  />
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
                'Add Vehicle Type'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default VehicleType
