export interface IAppService {

    id: string
    name: string
    type: string
    kind: string
    properties: IAppServiceProperties

}

export interface IAppServiceProperties {
    name: string
    state: string
    hostNames: string[]
    webSpace: string
    selfLink: string
    repositorySiteName: string
}