import React from 'react'
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import GetVehicleGroup from './get-vehicle-group';
import AddVehicleGroup from './add-vehicle-group';

const VehicleGroup = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleAddVehicleMake = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('get');
        router.push(`?${params.toString()}`);
    };

    const handleGetVehicleMake = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('get', 'true');
        router.push(`?${params.toString()}`);
    };
    return (
        <>
            <aside className='flex my-2 w-full justify-between bg-white p-2 rounded-full items-center'>
                <button onClick={handleAddVehicleMake} className={cn(!searchParams.get('get') && 'text-lg font-medium', 'text-primary-text')}>Add Vehicle Make</button>
                <button onClick={handleGetVehicleMake} className={cn(searchParams.get('get') && 'text-lg font-medium', 'text-primary-text')}>Get Vehicle Make</button>
            </aside>
            {
                searchParams.get('get') ? <GetVehicleGroup /> : <AddVehicleGroup />
            }
        </>
    )
}

export default VehicleGroup