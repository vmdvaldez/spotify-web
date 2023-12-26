import { useEffect, useState, useRef} from 'react'
import { useOutletContext } from 'react-router';
import styles from '../styles/RecentlyPlayed.module.css'

export default function RecentlyPlayed(){
    const {token} = useOutletContext();
    const [tracks, setTracks] = useState([]);
    const nextLink = useRef("");

    useEffect(()=>{
        if(nextLink.current == null){
            nextLink.current = "";
            return  
        }
        const getRecent = async ()=>{
            const url = nextLink.current ? nextLink.current : "https://api.spotify.com/v1/me/player/recently-played?";
            const resp = await fetch(url ,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        getRecent().then(json=>{
            const options = {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: "2-digit",
                minute: "2-digit"
            }
            const trackPlayedInfo = json.items.map(item=>{
                return(
                    {
                        name: item.track.name,
                        artist: item.track.artists.map(artist=>artist.name).join(', '),
                        playedAt: new Date(item.played_at).toLocaleDateString("en-US", options)}
                )
            })
            console.log(trackPlayedInfo)
            console.log(json);
            setTracks(tracks.concat(trackPlayedInfo));
            nextLink.current = json.next
            }
        );
        

    }, [nextLink.current, token]);
    let count = 0
    return(
        <section id="recentlyplayed">
            <div className={styles.recents}>
                <table className={styles.tableContainer}>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>By</th>
                        <th>Last Played</th>
                    </tr>
                    {tracks.map(track=>{
                        count++
                        return(
                        <tr key={track.playedAt}>
                            <td>{count}</td>
                            <td>{track.name}</td>
                            <td>{track.artist}</td>
                            <td>{track.playedAt}</td>
                        </tr>
                        )
                    })}
                </table>
            </div>

        </section>
    )

}