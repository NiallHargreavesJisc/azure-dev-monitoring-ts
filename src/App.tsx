import React, {useEffect, useState} from 'react';
import './App.css';
import GetVirtualMachineLists from "./main/virtualmachine/VirtualMachineList";
import AppService from "./main/pages/AppService";
import Home from "./main/pages/Home";
import VirtualMachines from "./main/pages/VirtualMachines";



function App() {

    const [page, setPage] = useState('home')

    const body = {
        'grant_type': 'client_credentials',
        'client_secret': process.env.LIVE_CLIENT_SECRET,
        'resource': process.env.RESOURCE,
        'client_id': process.env.LIVE_CLIENT_ID
    }

    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    // type AuthToken = () => {
    //     tokenType: string,
    //     expiresIn: number,
    //     extExpiresIn: number,
    //     expiresOn: number,
    //     notBefore: number,
    //     resource: string,
    //     accessToken: string
    // }

    const axios = require('axios');

    const getAuthToken = () => {
        console.log(axiosConfig)
        axios.post("https://login.microsoftonline.com/48f9394d-8a14-4d27-82a6-f35f12361205/oauth2/token", body, axiosConfig)
            .then(function (response: any){
                console.log(response)
                //setAuthToken(response)
            })
        //console.log(authToken);
    }


    useEffect( () => {

            const response: object[] = GetVirtualMachineLists()
            getAuthToken()
            console.log(response)
        },[] )

    return (
        <div>
            <h1>Azure Dev Monitoring</h1>
            <button onClick={() => setPage('home')}>Home</button>
            <button onClick={() => setPage('virtualMachines')}>Virtual Machines</button>
            <button onClick={() => setPage('appServices')}>App Services</button>
            {page === 'home' && <Home />}
            {page === 'virtualMachines' && <VirtualMachines />}
            {page === 'appServices' && <AppService />}

        </div>

    )
}

export default App;
