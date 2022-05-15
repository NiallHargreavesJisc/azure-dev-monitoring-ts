export interface VirtualMachineResponse {
    name: string
    id: string
    location: string
    tags: VirtualMachineTags

}

export interface VirtualMachineComplete extends VirtualMachineResponse {
    powerState: string
    ipAddress: string
}

export interface VirtualMachineTags {
    'created Date': string
    'Jenkins User': string
    Commit: string
    Type: string
    Branch: string
    Project: string
    Status: string
    Components: string
}

export interface VirtualMachineProviders {
    name: string
    id: string
    properties: ProviderProperties
}

export interface ProviderProperties {
    statuses: Status[]
}

export interface Status {
    code: string
    level: string
    time: string
}

export interface NetworkInterface {
    name: string
    properties: NetworkProperties
}

export interface NetworkProperties {
    ipConfigurations: IpConfigurations[]
}

export interface IpConfigurations {
    name: string
    properties: ipProperties[]
}

export interface ipProperties {
    privateIPAddress: string
}

