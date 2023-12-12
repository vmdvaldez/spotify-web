import { useEffect, useContext, useState } from 'react';
import './App.css'
import TopSongs from './components/TopArtists';
import TopArtists from './components/TopArtists';

const CLIENTID = import.meta.env.VITE_CLIENT_ID;
const CLIENTSECRET= import.meta.env.VITE_CLIENT_SECRET;
const REDIRECTURI="http://localhost:5173/";
console.assert(CLIENTID && CLIENTSECRET);

function App() {
  const [token, setToken] = useState(null);


  useEffect( ()=>{
    let storageToken = window.localStorage.getItem('token');

    if(window.location.hash && !storageToken ){
      storageToken = window.location.hash.substring(1).split('=')[1];
      window.location.hash = "";
      window.localStorage.setItem('token', storageToken);
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
      {!token ? <div>LOGIN</div> :
      
      <TopArtists token={token}/>
      
      }
    </>
  )
}

export default App
