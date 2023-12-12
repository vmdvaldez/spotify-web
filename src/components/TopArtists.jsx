import { useEffect, useState } from "react"


export default function TopArtists({token}){
    const [artists, setArtists] = useState(null);

    useEffect(()=>{
        const getUsers = async () =>{
            const url = "https://api.spotify.com/v1/me/top/artists"
            const resp = await fetch(url,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        getUsers().then(json=>{
            console.log(json)
            const artistNames = json.items.map(item => item.name);

            setArtists(json);
        })

    }, []);


    return(
    <>
        {!artists ? <div> LOADING </div> : 
            <section>
                <div>
                    {artists.items.map(
                        artist=>{
                        return (
                            <img src={artist.images[0].url}/>
                        )
                    })}
                </div>
            </section>
        }
    </>
    )
}