import {IAppServicePlan} from "./appServicePlan";

export interface IResourceGroup {
    id: string
    name: string
    type: string
    location: string
    properties: IResourceGroupProperties
    appServicePlans?: IAppServicePlan[]
}

export interface IResourceGroupProperties {
    provisioningState: string
}