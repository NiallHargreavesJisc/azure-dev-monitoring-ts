export interface AppServicePlan {
    id: string
    name: string
    type: string
    kind: string
    location: string
    properties: AppServicePlanProperties
    sku: AppServicePlanSku

}

export interface AppServicePlanProperties {
    workerSize: string
    workerSizeId: number
    numberOfWorkers: number
    status: string
}
export interface AppServicePlanSku {
    name: string
    tier: string
    size: string
    family: string
    capacity: string

}