import React from "react";
import {JsonClassType, JsonProperty, ObjectMapper} from "jackson-js";


class VirtualMachine {
    @JsonProperty() @JsonClassType({type: () => [String]})
    name: string | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    id: string | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    type: string | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    location: string | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    tags: string[] | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    powerState: string | undefined;
    @JsonProperty() @JsonClassType({type: () => [String]})
    privateIp: string[] | undefined;
}

function VirtualMachineList(): VirtualMachine[]  {

    const mapper = new ObjectMapper()

    const axios = require('axios');

    const LiveApiGetCall = (url: string): string => {

        let responseJson: string = '';

        const liveBearer: String = 'BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ4ZjkzOTRkLThhMTQtNGQyNy04MmE2LWYzNWYxMjM2MTIwNS8iLCJpYXQiOjE2NTAzNzMxMTIsIm5iZiI6MTY1MDM3MzExMiwiZXhwIjoxNjUwMzc3MDEyLCJhaW8iOiJFMlpnWURqVzZoNHV1OWQ1YmszOERPVzYrYkgzQUE9PSIsImFwcGlkIjoiMTc0NWFkODMtNjk4NS00YWRiLTg3Y2ItYmZkZmNkNzM2OTYyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDhmOTM5NGQtOGExNC00ZDI3LTgyYTYtZjM1ZjEyMzYxMjA1LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiY2ZjMWRkZjctNjcyNS00NzVkLWE4NWQtYjFhM2NhMjEzODQxIiwicmgiOiIwLkFRVUFUVG41U0JTS0owMkNwdk5mRWpZU0JVWklmM2tBdXRkUHVrUGF3ZmoyTUJNRkFBQS4iLCJzdWIiOiJjZmMxZGRmNy02NzI1LTQ3NWQtYTg1ZC1iMWEzY2EyMTM4NDEiLCJ0aWQiOiI0OGY5Mzk0ZC04YTE0LTRkMjctODJhNi1mMzVmMTIzNjEyMDUiLCJ1dGkiOiJkaWRvZGd3dGkweV8ycmNkUVRvSEFBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjEzNTM1MTA4MDl9.bzYmpZeWlZpMQer-1wJ-V-GmHA9D8_30MiJwRKZjfAZn8wuNsaQQcQcrDh4Hd4yat6RQTcpvq0_qBPudVRKx3JGBb4Tz_Bam0H04-KHmKbHDEYL1Wy4oQfzUK2l4ViBYAqpaRnPhsgSeIkyCljK5aAqauzFRwiVy3PATA2al8pQ4mgdTmb-VlwNtLGIn3pS3Pq6si8c76ssn182-0guJMHbCR-wXE0e7-hKPzUJNRsdTTAwZ6ySvNmajBQsVoCUz6iARCLkGYd-L5tp3lAvK2QAm9qeCnFvpjXtf0GUymnkDhYuqe7lHpxTKHU4zb3jmsABZbf5NaJmAsyh7rD-wXw'

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': liveBearer
            }
        }

        axios.get(url, axiosConfig)
            .then(function (response: any) {
                //console.log(response.data)
                responseJson = response.data.value
                if (response.data.nextLink) {
                    axios.get(response.data.nextLink, axiosConfig)
                        .then(function (response: any) {
                            console.log(response.data.value)
                            responseJson = responseJson + response.data.value
                        })
                }
                console.log(responseJson)
            })

        return responseJson
    }

    const GetVmList = (): VirtualMachine[] => {
        const virtualMachines: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01');

        const virtualMachineProviders: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/providers/Microsoft.Compute/virtualMachines?api-version=2020-12-01&statusOnly=true');

        const networkInterfaces: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Network/networkInterfaces?api-version=2020-11-01');

        // const vm = mapper.parse<VirtualMachine>(responseJson)
        // console.log(vm);

        // @ts-ignore
        return []

    }

    return  GetVmList()
}

export default VirtualMachineList