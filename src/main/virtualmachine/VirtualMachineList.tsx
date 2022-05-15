import React from "react";
import liveApiGetCall from "../utils/ApiHelper";
import {
    NetworkInterface,
    VirtualMachineComplete,
    VirtualMachineProviders,
    VirtualMachineResponse
} from "../interfaces/virtualMachine";

const virtualMachineList = async (): Promise<VirtualMachineComplete[]> => {

        const virtualMachines: VirtualMachineResponse[] = await liveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01');
        const virtualMachineProviders = await liveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/providers/Microsoft.Compute/virtualMachines?api-version=2020-12-01&statusOnly=true');
        const networkInterfaces = await liveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Network/networkInterfaces?api-version=2020-11-01');


        // @ts-ignore
        let result = virtualMachines.map((virtualMachine) => {
            const vmp = virtualMachineProviders.find((virtualMachineProvider: VirtualMachineProviders ) =>
                virtualMachineProvider.name === virtualMachine.name
            )
            let powerState = vmp.properties.instanceView.statuses.find((status: { code: string }) =>
                status.code.includes('PowerState/')
            )

            const ni = networkInterfaces.find((networkInterface : NetworkInterface) => {
                return networkInterface.name.split('-')[0] === virtualMachine.name
            })
            const ipAddress = ni.properties.ipConfigurations[0].properties.privateIPAddress

            if(powerState){
                switch (powerState.code){
                    case "PowerState/running":
                        powerState = '**RUNNING!**'
                        break;
                    case 'PowerState/deallocated':
                        powerState = 'Deallocated'
                        break;
                    case 'PowerState/stopped':
                        powerState = 'Stopped'
                        break;
                    default:
                        powerState = 'Unknown State'
                }
            }

            return {
                ...virtualMachine,
                powerState: powerState,
                ipAddress
            }
        })

        return result
}

export default virtualMachineList