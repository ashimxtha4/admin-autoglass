import React from 'react';
import GetVehicleModel from './get-vehicle-model';
import AddVehicleModel from './add-vehicle-model';
import { useNavigation } from '../utils/vehicle-navigation';
import TabButtonWrapper from '../utils/tab-button-wrapper';
import TabButton from '../utils/tab-button';

const VehicleModel = () => {
  const { searchParams, handleNavigation } = useNavigation()


  return (
    <>
      <TabButtonWrapper>
        <TabButton isActive={!searchParams.get('get')} onClick={() => handleNavigation(false)}>
          Add Vehicle Model
        </TabButton>
        <TabButton isActive={!!searchParams.get('get')} onClick={() => handleNavigation(true)}>
          Get Vehicle Model
        </TabButton>
      </TabButtonWrapper>
      {
        searchParams.get('get') ? <GetVehicleModel /> : <AddVehicleModel />
      }
    </>
  );
};

export default VehicleModel