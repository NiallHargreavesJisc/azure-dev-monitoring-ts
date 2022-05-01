import React from "react";
import { useMsal } from "@azure/msal-react";
// @ts-ignore
import { loginRequest } from "../authConfig";
// @ts-ignore
import Button from "react-bootstrap/Button";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleLogin(instance: IPublicClientApplication) {
    instance.loginPopup(loginRequest).catch((e: any) => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Popup</Button>
    );
}