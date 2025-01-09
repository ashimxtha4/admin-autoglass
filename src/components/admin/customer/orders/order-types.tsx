import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const AdminTabButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
    return (
        <button type='button' onClick={onClick} className={cn('text-primary-text text-nowrap pr-1 last:pr-0', className)}>{children}</button>
    )
}

const OrderTypes = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());

    const handleOrderFilter = (type: string | null) => {
        const orderTypes = ['ordered', 'dispatched', 'cancelled', 'returned'];
        orderTypes.forEach((orderType) => params.delete(orderType));
        if (type) {
            params.set(type, 'true');
        }
        router.push(`?${params.toString()}`);
    };
    return (
        <aside className='grid grid-cols-5 my-2 w-full justify-between bg-white rounded-full items-center'>
            <AdminTabButton
                onClick={() => handleOrderFilter(null)}
                className={cn(
                    !(searchParams.get('ordered') || searchParams.get('dispatched') || searchParams.get('cancelled') || searchParams.get('returned')) &&
                    'text-lg font-medium bg-primary-main rounded-full text-white'
                )}
            >
                All Orders
            </AdminTabButton>
            <AdminTabButton
                onClick={() => handleOrderFilter('ordered')}
                className={cn(
                    searchParams.get('ordered') && 'text-lg font-medium bg-primary-main rounded-full text-white'
                )}
            >
                New Orders
            </AdminTabButton>
            <AdminTabButton
                onClick={() => handleOrderFilter('dispatched')}
                className={cn(
                    searchParams.get('dispatched') && 'text-lg font-medium bg-primary-main rounded-full text-white'
                )}
            >
                Dispatched Orders
            </AdminTabButton>
            <AdminTabButton
                onClick={() => handleOrderFilter('cancelled')}
                className={cn(
                    searchParams.get('cancelled') && 'text-lg font-medium bg-primary-main rounded-full text-white'
                )}
            >
                Cancelled Orders
            </AdminTabButton>
            <AdminTabButton
                onClick={() => handleOrderFilter('returned')}
                className={cn(
                    searchParams.get('returned') && 'text-lg font-medium bg-primary-main rounded-full text-white'
                )}
            >
                Returned Orders
            </AdminTabButton>
        </aside>
    )
}

export default OrderTypes