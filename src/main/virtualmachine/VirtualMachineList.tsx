import React from "react";
import {JsonClassType, JsonProperty, ObjectMapper} from "jackson-js";
//import RequestAccessToken from "../apis/RequestAccessToken";


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

        let responseJson: string = ''

        //const accessToken: string = RequestAccessToken.toString()

        const liveBearer: string = 'BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ4ZjkzOTRkLThhMTQtNGQyNy04MmE2LWYzNWYxMjM2MTIwNS8iLCJpYXQiOjE2NTE0MTQwNzQsIm5iZiI6MTY1MTQxNDA3NCwiZXhwIjoxNjUxNDE3OTc0LCJhaW8iOiJFMlpnWUpnU0hpVnI0dFVuOWw4Z1NGcDczL05aQUE9PSIsImFwcGlkIjoiMTc0NWFkODMtNjk4NS00YWRiLTg3Y2ItYmZkZmNkNzM2OTYyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDhmOTM5NGQtOGExNC00ZDI3LTgyYTYtZjM1ZjEyMzYxMjA1LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiY2ZjMWRkZjctNjcyNS00NzVkLWE4NWQtYjFhM2NhMjEzODQxIiwicmgiOiIwLkFRVUFUVG41U0JTS0owMkNwdk5mRWpZU0JVWklmM2tBdXRkUHVrUGF3ZmoyTUJNRkFBQS4iLCJzdWIiOiJjZmMxZGRmNy02NzI1LTQ3NWQtYTg1ZC1iMWEzY2EyMTM4NDEiLCJ0aWQiOiI0OGY5Mzk0ZC04YTE0LTRkMjctODJhNi1mMzVmMTIzNjEyMDUiLCJ1dGkiOiI2akhKSXZxRkpFbTVKN1lQTXlJUUFBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjEzNTM1MTA4MDl9.Urq5sHHIiAhBLu2lemEx4S7XwzsvDW7XWHv3MMIUH5ljFnoAu5fpWUlv8RFDVG1wwDM6Eyys_XQ6E1Me-pOi35Lgsgt1lXeog4Qcqph04zKhrres-1diTZBHRV13r3R0F-3vkWOeF-JT8OW3TjoS1HQGZbpOihScIJti4Rv2FqtQwgzzzVlMDP7vIo1kTGnfOWePOvsaxjxzQVU9LXqMXz5RtWOHFDgiUnWaEaGo6Yc0SyFieGGbyAJeFDFoMwUb0nOHhBz3DOVAMyORNxN6zGYZ_C11U7JRa5CF3ZWdkxqhqNUK8HKrkhlbGV-mYJTXxWaO89Ebcekq161SiSB6oA' //+ accessToken

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
                            //console.log(response.data.value)
                            responseJson = responseJson + response.data.value
                        })
                }
                //console.log(responseJson)
            })

        return responseJson
    }

    const GetVmList = (): VirtualMachine[] => {
        const virtualMachines: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01');
        console.log(virtualMachines)
        const virtualMachineProviders: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/providers/Microsoft.Compute/virtualMachines?api-version=2020-12-01&statusOnly=true');
        console.log(virtualMachineProviders)
        const networkInterfaces: string = LiveApiGetCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Network/networkInterfaces?api-version=2020-11-01');
        console.log(networkInterfaces)

        // const vm = mapper.parse<VirtualMachine>(responseJson)
        // console.log(vm);

        // @ts-ignore
        return []

    }

    return  GetVmList()
}

export default VirtualMachineList