'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  productStock,
  statusOptions,
  useAddProduct
} from '@/hooks/admin/product/add-product.hooks'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ButtonLoader from '@/utils/button-loader'
import { cn } from '@/lib/utils'

const AddProduct = () => {
  const {
    form,
    onSubmit,
    isPending,
    vehicleMakeData,
    vehicleModelData,
    vehicleGroupData,
    vehicleSeriesData,
    vehicleBodyData
  } = useAddProduct()
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
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder='Product Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Product description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='invoice_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Invoice Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Product invoice description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder='sku' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Prefferred Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
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
            name='mel_stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melbourne stock</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Melbourne stock' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productStock.map(option => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
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
            name='syd_stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sydney stock</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Sydney stock' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productStock.map(option => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
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
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder='size' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Color</FormLabel>
                <FormControl>
                  <Input placeholder='Product Color' {...field} />
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
                    {vehicleMakeData?.map(option => (
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
            name='vehicle_model_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Vehicle Model' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleModelData?.map(option => (
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
            name='vehicle_position_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Vehicle position' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleGroupData?.map(option => (
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
            name='vehicle_series_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Series</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Vehicle series' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleSeriesData?.map(option => (
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
                    {vehicleBodyData?.map(option => (
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
              {form.formState.isSubmitting ? <ButtonLoader /> : 'Add Product'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddProduct
