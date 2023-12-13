import styles from '../styles/TopSongs.module.css';
import { useEffect, useState, useRef } from 'react';

export default function TopSongs({token}){
    const [songs, setSongs] = useState([]);
    const nextLink = useRef("");

    useEffect(()=>{
        if(nextLink.current == null) return
        const getUsers = async () =>{
            const url = nextLink.current ? nextLink.current : "https://api.spotify.com/v1/me/top/tracks"
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

    }, [nextLink.current, token]);

    console.log(songs)
    return(
        <section id="topSongs">
            <div className={styles.songs}>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Preview</th>
                    </tr>
                    {songs.map(song=>{
                        return(
                            <tr key={song.name}>
                                <td><img src={song.img}></img></td>
                                <td>{song.name}</td>
                                <td>{song.artist.join(', ')}</td>
                                <td><embed src={song.preview}></embed></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </section>
    )
}