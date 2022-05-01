const msalConfig = {
    auth: {
        clientId: "dfce9b8c-c6c8-4a5b-827f-c5dd05e0d5e1",
        authority: "https://login.microsoftonline.com/48f9394d-8a14-4d27-82a6-f35f12361205",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};

// Add scopes here for access token to be used at Microsoft Graph API endpoints.
const tokenRequest = {
    scopes: ["User.Read", "Mail.Read", "https://management.azure.com/subscriptions"]
};