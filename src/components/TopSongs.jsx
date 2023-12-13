import { useOutletContext } from 'react-router';
import styles from '../styles/TopSongs.module.css';
import { useEffect, useState, useRef } from 'react';

import Term from './Term';

// TODO: Create utlity function for get API
export default function TopSongs(){
    const {token} = useOutletContext();
    const [term, setTerm] = useState({time_range: "medium_term"})
    const [songs, setSongs] = useState([]);
    const nextLink = useRef("");

    useEffect(()=>{
        if(nextLink.current == null){
            nextLink.current = "";
            return  
        }
        const getUsers = async () =>{
            const url = nextLink.current ? nextLink.current : "https://api.spotify.com/v1/me/top/tracks?"
            const resp = await fetch(url + '&' + new URLSearchParams(term),{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        getUsers().then(json=>{
            console.log(json.items);
            const songNameArtistImg = json.items.map(song =>{
                return {
                    name: song.name,
                    artist: song.artists.map(artist=>artist.name),
                    img: song.album.images[0].url,
                    preview: song.preview_url
                };
            })
            setSongs(songs.concat(songNameArtistImg));
            nextLink.current = json.next;
        })

    }, [term, nextLink.current, token]);


    const setTermRange = (term)=>{
        if(term == 'short') setTerm({time_range: "short_term"})
        else if(term == 'medium') setTerm({time_range: "medium_term"})
        else if(term == 'long') setTerm({time_range: "long_term"})
        else {console.assert(0)}

        setSongs([]);
    }

    console.log(songs)

    let count = 0;
    return(
        <section id="topSongs">
            <Term setTerm={setTermRange}/>
            <div className={styles.songs}>
                <table className={styles.tableContainer}>
                    <tr>
                        <th>Number</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Artist</th>
                        {/* <th>Preview</th> */}
                    </tr>
                    {songs.map(song=>{
                        count++;
                        return(
                            <tr key={song.name}>
                                <td>{count}</td>
                                <td><div style={{backgroundImage: `url(${song.img})`}} className={styles.albumImg}></div></td>
                                {/* <td><img src={song.img} className={styles.albumImg}/></td> */}
                                <td>{song.name}</td>
                                <td>{song.artist.join(', ')}</td>
                                {/* <td><audio controls src={song.preview}></audio></td> */}
                            </tr>
                        )
                    })}
                </table>
            </div>
        </section>
    )
}