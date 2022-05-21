import {AppServicePlanProperties} from "./appServicePlan";

export interface AppService {

    id: string
    name: string
    type: string
    kind: string
    properties: AppServiceProperties

}

export interface AppServiceProperties {
    name: string
    state: string
    hostNames: string[]
    webSpace: string
    selfLink: string
    repositorySiteName: string
}