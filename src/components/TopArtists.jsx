import { useEffect, useRef, useState } from "react"
import styles from '../styles/TopArtists.module.css'
import { useOutletContext } from "react-router";
import { Link } from 'react-router-dom';
import Term from "./Term";

export default function TopArtists(){
    const {token} = useOutletContext();
    const [term, setTerm] = useState({time_range: "medium_term"})
    const [artists, setArtists] = useState([]);
    const nextLink = useRef("");

    useEffect(()=>{
        if(nextLink.current == null){
            nextLink.current = "";
            return  
        }

        const getUsers = async () =>{
            const url = nextLink.current ? nextLink.current : "https://api.spotify.com/v1/me/top/artists?"
            const resp = await fetch(url + '&'+ new URLSearchParams(term),{
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
                return {
                    id: artist.id,
                    name: artist.name, 
                    img: artist.images[0].url};
            })
            setArtists(artists.concat(artistNameImg));
            nextLink.current = json.next;
        })

    }, [term, nextLink.current, token]);


    const setTermRange = (term)=>{
        if(term == 'short') setTerm({time_range: "short_term"})
        else if(term == 'medium') setTerm({time_range: "medium_term"})
        else if(term == 'long') setTerm({time_range: "long_term"})
        else {console.assert(0)}

        setArtists([]);
    }


    // console.log(artists);
    return(
    <>
        {!artists.length ? <div> LOADING </div> : 
            <section id="topArtists">
                <Term setTerm={setTermRange} term={term}/>
                <div className={styles.artists}>
                    {artists.map(
                        artist=>{
                        return (
                            <Link 
                                to={artist.id} 
                                key={artist.name}
                                state={token}
                                > 
                                <div 
                                    className={styles.artist} 
                                    style={{backgroundImage: `url(${artist.img})`}}>
                                <h1 className={styles.name}>{artist.name}</h1>
                            </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        }
    </>
    )
}