import { useLocation, useParams } from 'react-router';
import styles from '../styles/ArtistPage.module.css';
import { useEffect, useState } from 'react';

export default function ArtistPage(){
    const {artistId} = useParams();
    const token = useLocation().state;
    const [artistInfo, setArtistInfo] = useState({});
    const [artistTracks, setartistTracks] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [relArtists, setRelArtist] = useState([]);

    useEffect(()=>{
        const getArtist = async () =>{
            const url = `https://api.spotify.com/v1/artists/${artistId}`
            const resp = await fetch(url,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        const getArtistTopTracks = async () =>{
            const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?`
            const query = {market:"CA"} // TODO: check user market?
            const resp = await fetch(url + new URLSearchParams(query),{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        const getArtistTopAlbums = async () =>{
            const url = `https://api.spotify.com/v1/artists/${artistId}/albums?`
            const query = {market:"CA", include_groups: "album"} // TODO: check user market?
            const resp = await fetch(url + new URLSearchParams(query),{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }

        const getRelatedArtist = async () =>{
            const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists?`
            const resp = await fetch(url,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await resp.json();
            return json
        }
        Promise.all(
            [   getArtist(), 
                getArtistTopTracks(), 
                getArtistTopAlbums(),
                getRelatedArtist()
            ])
            .then(([artist, tracks, albums, relArtists])=>{

                const aInfo = {
                    id: artist.id,
                    name: artist.name,
                    popularity: artist.popularity,
                    img: artist.images[0].url
                }

                const aTracks = tracks.tracks.map(t=>{
                    return(
                        {
                            id: t.id,
                            name: t.name,
                            popularity: t.popularity,
                            artists: t.artists.map(feat=>feat.name)
                        }
                    )
                })

                const aAlbums = albums.items.map(album=>{
                    return(
                        {
                            id: album.id,
                            name: album.name,
                            releaseDate: album.release_date,
                            img: album.images[0].url
                            // artists?
                        }
                    )
                });


                const relArt = relArtists.artists.map(artist=>{
                    return(
                        {
                            id: artist.id,
                            name: artist.name,
                            img: artist.images[0].url
                        }
                    )
                })

                setArtistInfo(aInfo);
                setartistTracks(aTracks);
                setArtistAlbums(aAlbums);
                setRelArtist(relArt);
            })

    },[token]);

    console.log(artistAlbums)
    return(
        <section id="artistPage" className={styles.artist}>
            <div>
                <h1>{`${artistInfo.name} (Popularity: ${artistInfo.popularity})`}</h1>
                <div><img src={artistInfo.img}/></div>
            </div>
            <div className={styles.albums}> 
                <ul>
                    {artistAlbums.map(album=>{
                        return(
                            <li><img src={album.img}/></li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <ul>
                    {artistTracks.map(artist=>{
                        return(
                            <li>{artist.name}</li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.relArtists}>
                <ul>
                    {relArtists.map(artist=>{
                        return(
                            <li><img src={artist.img}/></li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}