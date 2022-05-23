import React, {useState} from 'react';
import './App.css';
import AppService from "./main/pages/AppService";
import Home from "./main/pages/Home";
import VirtualMachines from "./main/pages/VirtualMachines";
import { SignInButton } from "./components/SignInButton";
import {useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import {SignOutButton} from "./components/SignOutButton";
// @ts-ignore
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";



const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            const at = response.accessToken
            // @ts-ignore
            setAccessToken(at);
            console.log(response)
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                const at = response.accessToken
                // @ts-ignore
                setAccessToken(at);
                console.log(response)
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {accessToken ?
                <p>Access Token Acquired!</p>
                :
                <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
            }
        </>
    );
}



function App() {

        const { instance, accounts } = useMsal();
        const [accessToken, setAccessToken] = useState('');

        function RequestAccessToken() {
            const request = {
                ...loginRequest,
                account: accounts[0]
            };

            // Silently acquires an access token which is then attached to a request for Microsoft Graph data
            instance.acquireTokenSilent(request).then((response) => {
                setAccessToken(response.accessToken);
                console.log(accessToken)
            }).catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    setAccessToken(response.accessToken);
                });
            });
        }

    const [page, setPage] = useState('home')
    const isAuthenticated = useIsAuthenticated();

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




    return (
        <div>
            <h1>Azure Dev Monitoring</h1>
            { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            <AuthenticatedTemplate>
                <ProfileContent />
                <br/>
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button onClick={() => setPage('home')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >Home</button>
                    <button onClick={() => setPage('virtualMachines')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >Virtual Machines</button>
                    <button onClick={() => setPage('appServices')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >App Services</button>
                </span>

                {page === 'home' && <Home />}
                {page === 'virtualMachines' && <VirtualMachines />}
                {page === 'appServices' && <AppService />}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>Please Sign In!</p>
            </UnauthenticatedTemplate>



        </div>

    )
}

export default App;
