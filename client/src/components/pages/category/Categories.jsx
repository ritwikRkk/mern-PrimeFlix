import React, { useEffect } from 'react';
import "./categories.css";
// import "../../styles/categories.css";
import { Link, Outlet, useLocation } from 'react-router-dom';

const Categories = () => {
    let location = useLocation();
    // let navigate = useNavigate();
    useEffect(() => {
        // navigate("/categories/movies");
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     if(location.pathname ==="/categories"){

    //         navigate("/categories/movies");
    //     }
    //     // eslint-disable-next-line
    // }, [location.pathname])
    
    // navigate("/categories/movies");
    return (
        <div className="categories_container">
            <div className="categories">
                <div className="categories_content">
                    <Link to="/categories/movies" className={`cat_link ${location.pathname === "/categories/movies" ? "active" : ""}`}><span className="cat_name">Movie</span></Link>
                    <Link to="/categories/tv" className={`cat_link ${location.pathname === "/categories/tv" ? "active" : ""}`}><span className="cat_name">Tv</span></Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Categories;