import {AppServicePlan} from "./appServicePlan";

export interface ResourceGroup {
    id: string
    name: string
    type: string
    location: string
    properties: ResourceGroupProperties
    appServicePlans: AppServicePlan[]
}

export interface ResourceGroupProperties {
    provisioningState: string
}