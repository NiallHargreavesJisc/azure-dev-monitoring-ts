import {IAppService} from "./appService";

export interface IAppServicePlan {
    id: string
    name: string
    type: string
    kind: string
    location: string
    properties: IAppServicePlanProperties
    sku: IAppServicePlanSku
    appServices?: IAppService[]
}

export interface IAppServicePlanProperties {
    workerSize: string
    workerSizeId: number
    numberOfWorkers: number
    status: string
}
export interface IAppServicePlanSku {
    name: string
    tier: string
    size: string
    family: string
    capacity: string

}