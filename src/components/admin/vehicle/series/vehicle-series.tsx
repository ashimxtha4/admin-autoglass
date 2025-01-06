import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import GetVehicleSeries from './get-vehicle-series';
import AddVehicleSeries from './add-vehicle-series';
import { cn } from '@/lib/utils';

const VehicleSeries = () => {
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
      <aside className='grid grid-cols-2 my-2 w-full justify-between bg-white p-2 rounded-full items-center'>
        <button onClick={handleAddVehicleMake} className={cn(!searchParams.get('get') && 'text-lg font-medium', 'text-primary-text')}>Add Vehicle Series</button>
        <button onClick={handleGetVehicleMake} className={cn(searchParams.get('get') && 'text-lg font-medium', 'text-primary-text')}>Get Vehicle Series</button>
      </aside>
      {
        searchParams.get('get') ? <GetVehicleSeries /> : <AddVehicleSeries />
      }
    </>
  )
}

export default VehicleSeries