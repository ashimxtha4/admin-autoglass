import React from 'react';
import GetVehicleMake from './get-vehicle-make';
import AddVehicleMake from './add-vehicle-make';
import { useNavigation } from '../utils/vehicle-navigation';
import TabButtonWrapper from '../utils/tab-button-wrapper';
import TabButton from '../utils/tab-button';

const VehicleMake = () => {
  const { searchParams, handleNavigation } = useNavigation()

  return (
    <>
      <TabButtonWrapper>
        <TabButton isActive={!searchParams.get('get')} onClick={() => handleNavigation(false)}>
          Add Vehicle Make
        </TabButton>
        <TabButton isActive={!!searchParams.get('get')} onClick={() => handleNavigation(true)}>
          Get Vehicle Make
        </TabButton>
      </TabButtonWrapper>
      {
        searchParams.get('get') ? <GetVehicleMake /> : <AddVehicleMake />
      }
    </>
  );
};

export default VehicleMake;