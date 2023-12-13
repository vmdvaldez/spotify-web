import { useEffect, useContext, useState } from 'react';
import './App.css'
import TopArtists from './components/TopArtists';
import TopSongs from './components/TopSongs';
import NavBar from './components/NavBar';

const CLIENTID = import.meta.env.VITE_CLIENT_ID || process.env.VITE_CLIENT_ID;
const CLIENTSECRET= import.meta.env.VITE_CLIENT_SECRET || process.env.VITE_CLIENT_SECRET;
const REDIRECTURI=import.meta.env.VITE_REDIRECT_URI || process.env.VITE_REDIRECT_URI;
console.assert(CLIENTID && CLIENTSECRET);

const TOKEN_EXPIRATION = 3600 * 1000; // 3600s -> 3600000ms

function App() {
  const [token, setToken] = useState(null);


  useEffect( ()=>{
    let recieved_date = window.localStorage.getItem('token_recieved');
    if(recieved_date && Date.now() - recieved_date >= TOKEN_EXPIRATION){
      window.localStorage.clear();
    }

    let storageToken = window.localStorage.getItem('token');


    if(window.location.hash && !storageToken ){
      storageToken = window.location.hash.substring(1).split('=')[1];
      window.location.hash = "";
      window.localStorage.setItem('token', storageToken);
      window.localStorage.setItem('token_recieved', Date.now());
    }
    
    if(!storageToken){
      const scope = 'user-top-read';
      const queryString = new URLSearchParams({
          response_type: 'token',
          client_id: CLIENTID,
          scope: scope,
          redirect_uri: REDIRECTURI,
          show_dialog: true
        }).toString();
      const authURL = "https://accounts.spotify.com/authorize?";
      window.location.href = authURL + queryString;
    }

    setToken(storageToken);
  }, []);



  return (
    <>
      <NavBar/>
      {!token ? <div>LOGIN</div> :
        // <TopArtists token={token}/>
        <TopSongs token={token}/>
      }
    </>
  )
}

export default App
