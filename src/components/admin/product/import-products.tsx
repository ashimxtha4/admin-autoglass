'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ButtonLoader from '@/utils/button-loader';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { usePostImportProduct } from '@/services/api/api-service/admin/product/import-product';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const checkFileType = (file: File) => {
  const fileType = file.type;
  return fileType === 'text/csv' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
};

const importProductSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, { message: 'File is required' })
    .refine((file) => checkFileType(file), {
      message: 'Only .csv or .xlsx formats are supported.',
    }),
});

export type TImportProductSchemaProps = z.infer<typeof importProductSchema>;

const ImportProduct = () => {

  const { isPending, mutateAsync } = usePostImportProduct();

  const form = useForm<TImportProductSchemaProps>({
    resolver: zodResolver(importProductSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    form.setValue('file', file as File);
    form.clearErrors('file');
  };

  const onSubmit = async (data: TImportProductSchemaProps) => {
    try {
      await mutateAsync({ file: data.file });
      form.reset();
      return toast.success('File uploaded successfully!');
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      return toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-lg border border-primary-text/50 p-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Product File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="!mt-2 flex gap-2 md:!mt-4">
            <Button
              type="submit"
              variant="default"
              className={cn(
                'bg-primary-main text-lg font-semibold text-white hover:bg-primary-dark md:text-xl'
              )}
            >
              {form.formState.isSubmitting ? <ButtonLoader /> : 'Upload File'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ImportProduct;
