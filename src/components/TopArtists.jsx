import { useEffect, useRef, useState } from "react"
import styles from '../styles/TopArtists.module.css'

export default function TopArtists({token}){
    const [artists, setArtists] = useState([]);
    const nextLink = useRef("");

    useEffect(()=>{
        if(nextLink.current == null) return
        const getUsers = async () =>{
            const url = nextLink.current ? nextLink.current : "https://api.spotify.com/v1/me/top/artists"
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
            const artistNameImg = json.items.map(artist =>{
                return {name: artist.name, img: artist.images[0].url};
            })
            setArtists(artists.concat(artistNameImg));
            nextLink.current = json.next;
        })

    }, [nextLink.current, token]);


    console.log(artists);
    return(
    <>
        {!artists.length ? <div> LOADING </div> : 
            <section id="topArtists">
                <div className={styles.artists}>
                    {artists.map(
                        artist=>{
                        return (
                            <div key={artist.name} className={styles.artist} style={{backgroundImage: `url(${artist.img})`}}>
                                <h1 className={styles.name}>{artist.name}</h1>
                            </div>
                        )
                    })}
                </div>
            </section>
        }
    </>
    )
}