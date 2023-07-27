import React, { useState } from 'react';
import "./mediaHero.css";
// import "../../styles/mediaHero.css";
// import {results, genres_list} from '../../Data';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import tmdbURL from '../../../api/urlConfigs/tmdbURL';

const MediaHero = (props) => {

    let [currIndex, setCurrIndex] = useState(0);
    let [genreObject, setGenreObject] = useState({});

    useEffect(() => {
        let iterator = setInterval(() => {
            setCurrIndex((prevVal) => (prevVal + 1) % props.results.length);
            // console.log(currItr);
        }, 5000);

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`)

        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            // console.log(vh);
        });

        genreObj();
        return () => {
            clearInterval(iterator);
        }
        // eslint-disable-next-line
    }, []);


    const genreObj = () => {
        let object = {};
        props.genre.forEach((elem)=>{
            object[elem.id]= elem.name;
        })
        setGenreObject(object);
        // console.log(genreObject);
    }


    return (
        <div className="hero">
            <div className="img-container" style={{ "background": `url(${tmdbURL.backdropPath(props.results[currIndex].backdrop_path)}) center/cover` }}></div>
            <div className="hero_container">
                {props.page === "movie" && <div className="media_name"> <span className={props.results[currIndex].original_title.length > 30 ? "small" : ""}>{props.results[currIndex].original_title}</span> </div>}
                {props.page === "tv" && <div className="media_name"> <span className={props.results[currIndex].original_name.length > 30 ? "small" : ""}>{props.results[currIndex].original_name}</span> </div>}
                <div className="media_info">
                    <div className="media_rating"> <span className="material-icons">star_half</span> <span> {props.results[currIndex].vote_average.toString().length === 1 ? `${props.results[currIndex].vote_average}.0` : props.results[currIndex].vote_average} </span> </div>
                    {props.page === "movie" && <div className="media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(props.results[currIndex].release_date).getFullYear()} </span> </div>}
                    {props.page === "tv" && <div className="media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(props.results[currIndex].first_air_date).getFullYear()} </span> </div>}
                </div>
                <div className="media_genres">
                    {props.results[currIndex].genre_ids.slice(0, 3).map((ids, index) => <span key={index} className="media_genre_name">{genreObject[ids]}</span>)}
                </div>
                <div className="media_description" >
                    <div> <span>{props.results[currIndex].overview.length > 0 ? props.results[currIndex].overview.slice(0, 120) : `Watch this latest ${props.page} show exclusively here on PrimFlix video Channel.`}...</span> </div>
                </div>
                <div className="media_utils">
                    <div className="watch_now_container"> <Link className="links watch_now" to={`/${props.page}/${props.results[currIndex].id}`}> <span className="material-icons">play_circle</span> <span> Watch Now </span> </Link> </div>
                    {/* <div className="favorite_container"> <Link className="links favorite" to=""> <span className="material-icons">favorite</span> </Link> </div> */}
                    {/* <button onClick={iterator}>change data</button> */}
                </div>
            </div>
            {/* {data.original_name} */}
        </div>

    )
}

export default MediaHero;