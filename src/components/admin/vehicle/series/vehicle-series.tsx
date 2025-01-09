import React from 'react'
import GetVehicleSeries from './get-vehicle-series';
import AddVehicleSeries from './add-vehicle-series';
import { useNavigation } from '../utils/vehicle-navigation';
import TabButtonWrapper from '../utils/tab-button-wrapper';
import TabButton from '../utils/tab-button';

const VehicleSeries = () => {
  const { searchParams, handleNavigation } = useNavigation()

  return (
    <>
      <TabButtonWrapper>
        <TabButton isActive={!searchParams.get('get')} onClick={() => handleNavigation(false)}>
          Add Vehicle Series
        </TabButton>
        <TabButton isActive={!!searchParams.get('get')} onClick={() => handleNavigation(true)}>
          Get Vehicle Series
        </TabButton>
      </TabButtonWrapper>
      {
        searchParams.get('get') ? <GetVehicleSeries /> : <AddVehicleSeries />
      }
    </>
  )
}

export default VehicleSeries