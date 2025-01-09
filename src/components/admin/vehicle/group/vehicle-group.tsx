import React from 'react'
import GetVehicleGroup from './get-vehicle-group';
import AddVehicleGroup from './add-vehicle-group';
import { useNavigation } from '../utils/vehicle-navigation';
import TabButton from '../utils/tab-button';
import TabButtonWrapper from '../utils/tab-button-wrapper';

const VehicleGroup = () => {
    const { searchParams, handleNavigation } = useNavigation()

    return (
        <>
            <TabButtonWrapper>
                <TabButton isActive={!searchParams.get('get')} onClick={() => handleNavigation(false)}>
                    Add Vehicle Group
                </TabButton>
                <TabButton isActive={!!searchParams.get('get')} onClick={() => handleNavigation(true)}>
                    Get Vehicle Group
                </TabButton>
            </TabButtonWrapper>
            {
                searchParams.get('get') ? <GetVehicleGroup /> : <AddVehicleGroup />
            }
        </>
    )
}

export default VehicleGroup