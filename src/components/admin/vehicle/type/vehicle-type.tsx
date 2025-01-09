import React from 'react'
import GetVehicleType from './get-vehicle-type';
import AddVehicleType from './add-vehicle-type';
import { useNavigation } from '../utils/vehicle-navigation';
import TabButtonWrapper from '../utils/tab-button-wrapper';
import TabButton from '../utils/tab-button';

const VehicleType = () => {
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
                searchParams.get('get') ? <GetVehicleType /> : <AddVehicleType />
            }
        </>
    );
}

export default VehicleType