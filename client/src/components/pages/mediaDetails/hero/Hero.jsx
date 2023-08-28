import React, { useState, useEffect } from 'react'
import "./mediaDetailsHero.css";
// import "../../../styles/mediaDetailsHero.css";
// import { results } from '../../../Data';
// import { Link } from 'react-router-dom';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import LoadingCircular from '../../../utility/loadingCircle/LoadingCircular';
import { getFavArr, checkFav, favoriteHandler } from '../../../utility/functions/FavoriteFunctions';
import { deleteMsg, msgDetails } from '../../../../store/slices/MsgSlice';


const Hero = (props) => {
    const state = useSelector(state => state.md);
    const videosLen = state.mdVideos.length;

    const dispatch = useDispatch();
    // const { id, img, rating, year, name, page } = props;
    const { id, backdrop_path, poster_path, original_title, original_name, vote_average, release_date, first_air_date, genres, overview } = props.mediaDetail;
    const [highlight, setHightlight] = useState(false);
    const [favId, setFavId] = useState(null);
    const [loading, setLoading] = useState(false);
    const favorites = useSelector(state => state.favorites.favoritesArr);

    let favArr = getFavArr(favorites, props.page);
    const favDetails = {
        id: id,
        img: poster_path,
        rating: vote_average,
        year: props.page === "movie" ? release_date : first_air_date,
        name: props.page === "movie" ? original_title : original_name,
        page: props.page
    }

    useEffect(() => {
        let fav = checkFav(id, favArr, setFavId);
        if (fav) {
            setHightlight(true);
        } else {
            setHightlight(false);
        }
        //eslint-disable-next-line
    }, [])

    const handleFav = async () => {

        let authToken = localStorage.getItem('auth-token');
        if (authToken) {
            const fnDetails = { highlight, favId, setLoading, authToken, setFavId, setHightlight, dispatch };
            favoriteHandler(fnDetails, favDetails);
        } else {
            dispatch(msgDetails({ msgType: "failed", msgContent: "Please Login or Sign Up first to add favorites" }))
            setTimeout(() => dispatch(deleteMsg()), 3000);
            // console.log("Please Login or Sign Up first to add favorites");
        }

    }


    return (
        <div className="mediaDetailsHero">
            <div className="mdh-img-container" style={{ "backgroundImage": `var(--lGradHero), url(${tmdbURL.backdropPath(backdrop_path)}) ` }}></div>
            <div className="mdh_container">
                <div className="mdh-poster_container">
                    <div className="mdh-poster_img" style={{ "background": `url(${tmdbURL.posterPath(poster_path)}) center/cover` }}></div>
                </div>

                <div className="mediaDetailsHero_container">
                    {props.page === "movie" && <div className="mdh-media_name"> <span className={original_title.length > 30 ? "small" : ""}>{original_title}</span> </div>}
                    {props.page === "tv" && <div className="mdh-media_name"> <span className={original_name.length > 30 ? "small" : ""}>{original_name}</span> </div>}
                    <div className="mdh-media_info">
                        <div className="mdh-media_rating"> <span className="material-icons">star_half</span> <span> {vote_average.toString().length === 1 ? `${vote_average}.0` : vote_average} </span> </div>
                        {props.page === "movie" && <div className="mdh-media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(release_date).getFullYear()} </span> </div>}
                        {props.page === "tv" && <div className="mdh-media_release_year"> <span className="material-icons">calendar_month</span> <span> {new Date(first_air_date).getFullYear()} </span> </div>}
                    </div>
                    <div className="mdh-media_genres">
                        {genres.slice(0, 3).map((elem, index) => <span key={index} className="media_genre_name">{elem.name}</span>)}
                    </div>
                    <div className="mdh-media_description" >
                        <div> <span>{overview.length > 0 ? overview : `Watch this latest ${props.page} show exclusively here on PrimFlix video Channel.`}...</span> </div>
                    </div>
                    <div className="mdh-media_utils">
                        {/* <div className="mdh-watch_now_container"> <Link className="links watch_now" to={`/${props.page}`}> <span className="material-icons">play_circle</span> <span> Watch Now </span> </Link> </div> */}
                        {videosLen > 0 && <div className="mdh-watch_now_container"> <span className="links watch_now" onClick={props.click} > <span className="material-icons">play_circle</span> <span> Watch Now </span> </span> </div>}
                        <div className="mdh-favorite_container">
                            <span className={"links favorite"}>
                                {!loading && <span onClick={handleFav} className={`material-icons ${highlight ? "fav_highlight" : ""}`}>favorite</span>}
                                {loading && <LoadingCircular />}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            {/* {data.original_name} */}
        </div>
    )
}

export default Hero