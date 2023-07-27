import React from 'react';
import "./hero.css";
// import "../../../styles/hero.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';

const Hero = () => {
    const state = useSelector(state => state.home);
    const img = state.mediaContent[0].backdrop_path;
    // const img = state.mediaContent.data.data.results[0].backdrop_path;

    return (
        <>
            {state.isLoading === false && <div className="home_hero">
                <div className="home_img-container" style={{ "background": `url(${tmdbURL.backdropPath(img)}) center/cover` }}></div>
                <div className="home_hero_container">
                    <div className="home_welcome"> <span className=""> Welcome to PrimeFlix </span> </div>
                    <div className="home_welcome_msg">
                        <span> Watch the latest movies, TV shows, and award-winning PrimeFlix Originals </span>
                    </div>
                    <div className="home_media_utils">
                        <div className="home_sign_in_container"> <Link className="home_links sign_in" to="/"> <span> Join PrimeFlix </span> </Link> </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Hero;