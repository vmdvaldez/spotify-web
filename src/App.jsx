import { useEffect, useContext, useState } from 'react';
import './App.css'
import TopSongs from './components/TopArtists';

const CLIENTID = import.meta.env.VITE_CLIENT_ID;
const CLIENTSECRET= import.meta.env.VITE_CLIENT_SECRET;
const REDIRECTURI="http://localhost:5173/";
console.assert(CLIENTID && CLIENTSECRET);

function App() {
  const [token, setToken] = useState(null);


  useEffect( ()=>{
    const scope = 'user-top-read';
    const queryString = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENTID,
        scope: scope,
        redirect_uri: REDIRECTURI,
        show_dialog: true
      }).toString();
    const authURL = "https://accounts.spotify.com/authorize?";
    
    const localToken = window.localStorage.getItem('token');
    console.log(localToken);

    if(window.location.search && !localToken){
      const code = new URLSearchParams(window.location.search).get('code');
      const tokenURL = "https://accounts.spotify.com/api/token";

      const getToken = async()=>{
          const resp = await fetch(tokenURL,{
            method: "POST",
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: REDIRECTURI
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(CLIENTID + ':' + CLIENTSECRET)
            }
          });
          const json = await resp.json();
          return json
      }
      getToken().then(ret=>{
        console.log(ret);
        console.log(ret.access_token);
        window.localStorage.setItem('token', ret.access_token);
      });

    }
    
    if(!localToken) window.location.href = authURL + queryString;
    
    setToken(localToken);

  }, []);



  return (
    <>
      {!token ? <div>LOGIN</div> :
      
      <TopSongs token={token}/>
      
      }
    </>
  )
}

export default App
