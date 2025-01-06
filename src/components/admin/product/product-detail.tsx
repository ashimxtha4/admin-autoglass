import React, { useState } from 'react'
import Image from 'next/image'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'
import { DEFAULT_IMAGE } from '@/utils/default-image-url'
import { Card } from '@/components/ui/card'
import { useGetProductDetails } from '@/services/api/api-service/admin/product/product-detail'

const ProductDetail = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const { data, isLoading } = useGetProductDetails()
    const productData = data?.data
    const productImages = data?.data?.images

    return (
        <section className='container mx-auto p-6'>
            {isLoading && <LoadingSpinner />}

            <Card className='mb-10 flex flex-col items-start rounded-3xl bg-white p-6 shadow-xl md:flex-row md:space-x-10'>
                <div className='flex max-w-[450px] flex-col items-center md:items-start'>
                    <div
                        className='relative cursor-pointer overflow-hidden rounded-2xl md:w-[80%]'
                    >
                        <Image
                            src={
                                productImages?.length
                                    ? productImages[selectedImageIndex].image
                                    : DEFAULT_IMAGE
                            }
                            loading='lazy'
                            width={400}
                            height={400}
                            alt='Product Image'
                            className='h-full w-full object-cover transition-transform duration-300 ease-in-out'
                        />
                    </div>

                    <div className='mt-4 flex items-center justify-center gap-1 space-x-3 md:w-[80%]'>
                        {productImages?.map((image, index) => (
                            <Image
                                key={index}
                                loading='lazy'
                                src={image.image || DEFAULT_IMAGE}
                                alt={`Product ${image.id}`}
                                width={64}
                                height={64}
                                onClick={() => setSelectedImageIndex(index)}
                                className={cn('h-16 w-16 cursor-pointer object-cover transition-transform duration-200 ease-in-out', selectedImageIndex === index
                                    ? 'scale-105 ring-2 ring-primary-main'
                                    : 'hover:scale-105'
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className='mt-8 flex-grow text-center md:mt-0 md:text-left'>
                    <h1 className='md:text-3xl text-start text-xl font-normal text-primary-text'>
                        {productData?.name || ''}
                    </h1>
                    <div className='my-2 md:my-4 border-b border-b-[#B0B0B0] pb-3 flex items-center gap-2'>
                    </div>
                    <p className='mt-2 text-base text-start font-normal text-primary-text/80'>
                        FROM:{' '}
                        <span className='font-semibold text-lg text-primary-text'>
                            AUD ${productData?.price || '0.00'}
                        </span>
                    </p>
                    <p className='my-2 text-start'>
                        <span className='w-fit rounded-full bg-[#D3F2D0] text-sm px-2 py-1 font-medium text-primary-text'>
                            SKU: {productData?.sku || ''}
                        </span>
                    </p>

                    <p className='my-2 text-start'>
                        <span className='mt-2 text-base font-normal text-primary-text/80'>
                            Color: <span className='text-primary-text/90'>{productData?.color || 'N/A'}</span>
                        </span>
                    </p>

                    <div className='my-2 border-b border-b-[#B0B0B0] pb-3 flex flex-col justify-start'>
                        <div className='flex justify-between gap-1 max-w-[200px]'>
                            <p className='text-primary-text/80 text-base'>Stock in Sydney:</p>
                            <p className='text-base font-medium text-primary-text'>
                                {productData?.syd_stock === 1 ? 'Yes' : 'No'}
                            </p>
                        </div>
                        <div className='flex justify-between gap-1 max-w-[200px]'>
                            <p className='text-primary-text/80 text-base text-nowrap'>Stock in Melbourne: </p>
                            <p className='text-base font-medium text-primary-text'>
                                {productData?.mel_stock === 1 ? 'Yes' : 'No'}
                            </p>
                        </div>
                    </div>

                    {/* product details */}
                    <div className='my-2 md:my-5 text-start'>
                        <p className='text-lg font-normal text-primary-text/80'>Product Details</p>
                        <ul className='list-disc my-2 list-inside text-base font-normal text-primary-text/80'>
                            <li>Description: <span className='ml-1 text-primary-text/90'>{productData?.description || 'N/A'}</span></li>
                            <li>Invoice Description: <span className='ml-1 text-primary-text/90'>{productData?.invoice_description || 'N/A'}</span></li>
                            <li>Body: <span className='ml-1 text-primary-text/90'>{productData?.body || 'N/A'}</span></li>
                            <li>Auto Glass Shop Category: <span className='ml-1 text-primary-text/90'>{productData?.auto_glass_shop_catg || 'N/A'}</span></li>
                            <li>Auto Glass Shop ID: <span className='ml-1 text-primary-text/90'>{productData?.auto_glass_shop_id || 'N/A'}</span></li>
                            <li>Specific Position: <span className='ml-1 text-primary-text/90'>{productData?.specific_position || 'N/A'}</span></li>
                            <li>Size: <span className='ml-1 text-primary-text/90'>{productData?.size || 'N/A'}</span></li>
                            <li>Start Date: <span className='ml-1 text-primary-text/90'>{productData?.start_date || 'N/A'}</span></li>
                            <li>End Date: <span className='ml-1 text-primary-text/90'>{productData?.end_date || 'N/A'}</span></li>
                            <li>Vehicle Make: <span className='ml-1 text-primary-text/90'>{productData?.vehicle_brand || 'N/A'}</span></li>
                            <li>Vehicle Type: <span className='ml-1 text-primary-text/90'>{productData?.vehicle_type || 'N/A'}</span></li>
                            <li>Vehicle Position: <span className='ml-1 text-primary-text/90'>{productData?.vehicle_position || 'N/A'}</span></li>
                            <li>Vehicle Model: <span className='ml-1 text-primary-text/90'>{productData?.vehicle_model || 'N/A'}</span></li>
                            <li>Vehicle Series: <span className='ml-1 text-primary-text/90'>{productData?.vehicle_series || 'N/A'}</span></li>
                        </ul>
                    </div>
                </div>
            </Card>
        </section>
    )
}

export default ProductDetail