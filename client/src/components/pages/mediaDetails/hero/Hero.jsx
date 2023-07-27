import React from 'react';
import "./mediaDetailsHero.css";
// import "../../../styles/mediaDetailsHero.css";
// import { results } from '../../../Data';
import { Link } from 'react-router-dom';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const Hero = (props) => {
    const state = useSelector(state => state.md);
    const videosLen = state.mdVideos.length;

    return (
        <div className="mediaDetailsHero">
            <div className="mdh-img-container" style={{ "backgroundImage": `var(--lGradHero), url(${tmdbURL.backdropPath(props.mediaDetail.backdrop_path)}) ` }}></div>
            <div className="mdh_container">
                <div className="mdh-poster_container">
                    <div className="mdh-poster_img" style={{ "background": `url(${tmdbURL.posterPath(props.mediaDetail.poster_path)}) center/cover` }}></div>
                </div>

                <div className="mediaDetailsHero_container">
                    {props.page === "movie" && <div className="mdh-media_name"> <span className={props.mediaDetail.original_title.length > 30 ? "small" : ""}>{props.mediaDetail.original_title}</span> </div>}
                    {props.page === "tv" && <div className="mdh-media_name"> <span className={props.mediaDetail.original_name.length > 30 ? "small" : ""}>{props.mediaDetail.original_name}</span> </div>}
                    <div className="mdh-media_info">
                        <div className="mdh-media_rating"> <span className="material-icons">star_half</span> <span> {props.mediaDetail.vote_average.toString().length === 1 ? `${props.mediaDetail.vote_average}.0` : props.mediaDetail.vote_average} </span> </div>
                        {props.page === "movie" && <div className="mdh-media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(props.mediaDetail.release_date).getFullYear()} </span> </div>}
                        {props.page === "tv" && <div className="mdh-media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(props.mediaDetail.first_air_date).getFullYear()} </span> </div>}
                    </div>
                    <div className="mdh-media_genres">
                        {props.mediaDetail.genres.slice(0, 3).map((elem, index) => <span key={index} className="media_genre_name">{elem.name}</span>)}
                    </div>
                    <div className="mdh-media_description" >
                        <div> <span>{props.mediaDetail.overview.length > 0 ? props.mediaDetail.overview : `Watch this latest ${props.page} show exclusively here on PrimFlix video Channel.`}...</span> </div>
                    </div>
                    <div className="mdh-media_utils">
                        {/* <div className="mdh-watch_now_container"> <Link className="links watch_now" to={`/${props.page}`}> <span className="material-icons">play_circle</span> <span> Watch Now </span> </Link> </div> */}
                        {videosLen>0 && <div className="mdh-watch_now_container"> <Link className="links watch_now" onClick={props.click} > <span className="material-icons">play_circle</span> <span> Watch Now </span> </Link> </div>}
                        <div className="mdh-favorite_container"> <Link className="links favorite" to="/fav"> <span className="material-icons">favorite</span> </Link> </div>
                    </div>
                </div>

            </div>
            {/* {data.original_name} */}
        </div>
    )
}

export default Hero