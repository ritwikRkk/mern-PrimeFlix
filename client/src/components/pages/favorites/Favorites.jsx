import React from 'react';
import "./favorites.css";
// import "../../styles/favorites.css";
import { Link, Outlet, useLocation } from 'react-router-dom';
// import MediaList from '../../utility/mediaList/MediaList';

const Favorites = () => {
    let location = useLocation();

    return (
        <div className="favorites_container">
            <div className="favorites_select">
                <div className="favorites_content">
                    <Link to="/favorites/movie" className={`cat_link ${location.pathname === "/favorites/movie" ? "active" : ""}`}><span className="cat_name">Movie</span></Link>
                    <Link to="/favorites/tv" className={`cat_link ${location.pathname === "/favorites/tv" ? "active" : ""}`}><span className="cat_name">Tv</span></Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Favorites