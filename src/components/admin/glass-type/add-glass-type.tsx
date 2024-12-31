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
import { Input } from '@/components/ui/input'
import ButtonLoader from '@/utils/button-loader'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { usePostAddGlassType } from '@/services/api/api-service/admin/glass-type/add-glass-type'


const addGlassTypeSchema = z.object({
    name: z.string({ required_error: 'Please enter the product name.' }),
})

export type TAddGlassTypeSchemaProps = z.infer<typeof addGlassTypeSchema>

const AddGlassType = () => {

    const { isPending, mutateAsync } = usePostAddGlassType()

    const form = useForm<TAddGlassTypeSchemaProps>({
        resolver: zodResolver(addGlassTypeSchema)
    })

    const onSubmit = async (data: TAddGlassTypeSchemaProps) => {
        try {
            await mutateAsync(data)
            toast.success('Glass Type added successfully!')
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
                    className='space-y-8 rounded-lg border border-primary-text/50 p-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Glass Type Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Glass Type Name' {...field} />
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
                            {form.formState.isSubmitting ? <ButtonLoader /> : 'Add Glass Type'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AddGlassType