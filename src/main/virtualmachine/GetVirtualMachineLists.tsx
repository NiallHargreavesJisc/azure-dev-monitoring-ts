import {useState} from "react";


const VirtualMachineList = (): string => {

    const axios = require('axios');

    const LiveApiCall = (url: string): string => {

        const [response, setResponse] = useState('')

        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // // @ts-ignore
        // myHeaders.append("Authorization", liveBearer);
        //
        // const requestOptions = {
        //     method: 'get',
        //     headers: myHeaders,
        // };
        //
        // // @ts-ignore
        // await fetch("https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01", requestOptions,)
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        // const response = url
        // return response;

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': liveBearer
            }
        }

        axios.get(url, axiosConfig)
            .then(function (response: any){
                console.log(response)
                setResponse(response.json())
            })

        return response
    }

    const [vmList, setVmList] = useState('');

    const liveBearer: String = 'BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ4ZjkzOTRkLThhMTQtNGQyNy04MmE2LWYzNWYxMjM2MTIwNS8iLCJpYXQiOjE2NTAwMzEwMjgsIm5iZiI6MTY1MDAzMTAyOCwiZXhwIjoxNjUwMDM0OTI4LCJhaW8iOiJFMlpnWU5DVGVCM2JmeTdqZlBhNlczdXM1ekxPQXdBPSIsImFwcGlkIjoiMTc0NWFkODMtNjk4NS00YWRiLTg3Y2ItYmZkZmNkNzM2OTYyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDhmOTM5NGQtOGExNC00ZDI3LTgyYTYtZjM1ZjEyMzYxMjA1LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiY2ZjMWRkZjctNjcyNS00NzVkLWE4NWQtYjFhM2NhMjEzODQxIiwicmgiOiIwLkFRVUFUVG41U0JTS0owMkNwdk5mRWpZU0JVWklmM2tBdXRkUHVrUGF3ZmoyTUJNRkFBQS4iLCJzdWIiOiJjZmMxZGRmNy02NzI1LTQ3NWQtYTg1ZC1iMWEzY2EyMTM4NDEiLCJ0aWQiOiI0OGY5Mzk0ZC04YTE0LTRkMjctODJhNi1mMzVmMTIzNjEyMDUiLCJ1dGkiOiJPR3hBSXhwMVlVLWc1T09ZM2ZJYkFBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjEzNTM1MTA4MDl9.bEoEGA1IkmmV6_1Hf33ECRbE44-C8Ih8lZ-JvMZpy_vdrkHtkGfBuyricv9ikG1TuMYtpsoCovBARu9csIijqv9K3MmasWhHCBIwKnSvKpYF1ImTN2Q4qUMl5MVV-3YXjIrQzg_xQnc6WFPiuaRt5LBhMN2UWzJCqi4UI84FgVlZYFG9b04UVvkey-KZzLf8KuNeG63DCOs5GKp6Eph_i3RPpmQ1vu48QcY6KPS2NEqwPVs62176DN4iJx8mvgjrwAa2JH9hg6cE89p7MG2ztG0RrFtAcZ3PSKU2Vh-WpSUMjr5aIhl-eJyuRVMdplyw7dyn5Q7ZJQrdcnY1YC5A4Q'

    const virtualMachines: string = LiveApiCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01');

    const virtualMachineProviders: string = LiveApiCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/providers/Microsoft.Compute/virtualMachines?api-version=2020-12-01&statusOnly=true');

    const networkInterfaces: string = LiveApiCall('https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Network/networkInterfaces?api-version=2020-11-01');

    const body = {
        'grant_type': 'client_credentials',
        'client_secret': process.env.LIVE_CLIENT_SECRET,
        'resource': process.env.RESOURCE,
        'client_id': process.env.LIVE_CLIENT_ID
    }

    setVmList(virtualMachines + ' ' + virtualMachineProviders + ' ' + networkInterfaces)

    return  vmList
}

export default VirtualMachineList