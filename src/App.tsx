import React, {useEffect} from 'react';
import './App.css';
import GetVirtualMachineLists from "./main/virtualmachine/GetVirtualMachineLists";
import axios from "axios";



function App() {

    // const axiosConfig = {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }
    // type AuthToken = () => {
    //     tokenType: string,
    //     expiresIn: number,
    //     extExpiresIn: number,
    //     expiresOn: number,
    //     notBefore: number,
    //     resource: string,
    //     accessToken: string
    // }
    //
    // const axios = require('axios');
    //
    // const getAuthToken = () => {
    //     axios.post("https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/48f9394d-8a14-4d27-82a6-f35f12361205/oauth2/token", body, axiosConfig)
    //         .then(function (response: any){
    //             console.log(response)
    //             //setAuthToken(response)
    //         })
    //     //console.log(authToken);
    // }


    useEffect( () => {

            const response = GetVirtualMachineLists()

            console.log(response)
        },[] )

    return (
        <h1> Hello world</h1>
    )
}

export default App;
