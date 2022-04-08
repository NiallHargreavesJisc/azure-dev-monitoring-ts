import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    type AuthToken = () => {
        tokenType: string,
        expiresIn: number,
        extExpiresIn: number,
        expiresOn: number,
        notBefore: number,
        resource: string,
        accessToken: string
    }

    const axios = require('axios');

    //const authToken: AuthToken [authToken, setAuthToken] = useState: any(null);

    const getAuthToken = () => {
        axios.post("https://login.microsoftonline.com/48f9394d-8a14-4d27-82a6-f35f12361205/oauth2/token", {
            proxy: {
                host: 'localhost',
                port: 3000
            }
        })
            .then(function (response: any){
            console.log(response)
            //setAuthToken(response)
        })
        //console.log(authToken);
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <h1>Help!</h1>
        <ul>
            <li> </li>
        </ul>
      <button onClick={() => getAuthToken()}/>

      </body>
    </div>
  );
}

export default App;
