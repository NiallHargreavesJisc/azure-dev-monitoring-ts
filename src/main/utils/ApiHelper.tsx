import axios from 'axios';
import {IResourceGroup} from "../interfaces/resourceGroup";
import {IAppServicePlan} from "../interfaces/appServicePlan";
import {IAppService} from "../interfaces/appService";
import {VirtualMachineComplete} from "../interfaces/virtualMachine";

export const constructUrl = (url: string, environment: string): string => {

    const tenantId = environment === 'dev' ? process.env.REACT_APP_DEV_TENANT_ID : process.env.REACT_APP_LIVE_TENANT_ID

    return `https://management.azure.com/subscriptions/${tenantId}${url}`

}


export const apiGetCall = async (url: string, environment: string = 'live') => {

    const bearer = environment === 'dev' ? process.env.REACT_APP_DEV_BEARER_TOKEN : process.env.REACT_APP_LIVE_BEARER_TOKEN

    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': bearer
        }
    }

    const exUrl = constructUrl(url, environment)
    console.log(`EXURL: ${exUrl}`)

    let responseJson: any = []

    // @ts-ignore
    await axios.get(exUrl, axiosConfig)
        .then(function (response: any) {
            responseJson = response.data.value
            if (response.data.nextLink) {
                // @ts-ignore
                axios.get(response.data.nextLink, axiosConfig)
                    .then(function (response: any) {
                        responseJson = responseJson + response.data.value
                    })
            }
        })

    return responseJson
}

export const resourceGroupList = async (environment: string): Promise<IResourceGroup[]> => {

    return await apiGetCall('/resourcegroups?api-version=2021-04-01', environment)

}

export const appServicePlanList = async (name: string, environment: string): Promise<IAppServicePlan[]> => {

    return await apiGetCall(`/resourceGroups/${name}/providers/Microsoft.Web/serverfarms?api-version=2021-02-01`, environment)

}

export const appServiceList = async (rgName: string, aspName: string, environment: string): Promise<IAppService[]> => {

    return await apiGetCall(`/resourceGroups/${rgName}/providers/Microsoft.Web/serverfarms/${aspName}/sites?api-version=2021-02-01`, environment)

}

export const changePowerState = async (vm: VirtualMachineComplete, newPowerState: string) => {

    const vmName = vm.name

    const bearer = process.env.REACT_APP_LIVE_BEARER_TOKEN!

    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': bearer
        }
    }

    const url = 'https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines/' + vmName + '/' + newPowerState + '?api-version=2020-12-01'


    await axios.post(url, axiosConfig)
        .then(function (response: any) {
            const responseJson = response.data
        })
}

export const deleteVirtualMachine = async (vm: VirtualMachineComplete) => {

    const vmName = vm.name

    const bearer = process.env.REACT_APP_LIVE_BEARER_TOKEN!

    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': bearer
        }
    }

    const url = 'https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines/' + vmName + '/?api-version=2020-12-01'


    await axios.delete(url, axiosConfig)
        .then(function (response: any) {
            const responseJson = response.data
        })
}

