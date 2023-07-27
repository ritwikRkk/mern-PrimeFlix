import React, { useState, useEffect } from 'react';
import "./nav.css";
// import "../styles/nav.css";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Nav = () => {
    const favoritesLen = useSelector(state => state.favorites.favoritesArr.length);
    // console.log(favoritesLen);
    const [themeMode, setThemeMode] = useState("dark");

    const toogleMobileMenu = () => {
        const navToggle = document.querySelector('.navbar__toggle');
        const navMenu = document.querySelector('.navbar__menu');

        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    const [scrollHeight, setScrollHeight] = useState(0);
    let location = useLocation();

    const handleScroll = () => {
        setScrollHeight(window.scrollY);

        // hiding and unhiding the scroller
        let scroller_container = document.querySelector(".scroller_container");

        //  SET THE --navbar-opacity TO 1 FOR CATEGORIES PAGE ONLY
        if ((scrollHeight >= 80) || (location.pathname.split("/")[1] === "categories")) {
            document.documentElement.style.setProperty('--navbar-opacity', 1)
            scroller_container.style.display = "flex";
        } else {
            document.documentElement.style.setProperty('--navbar-opacity', 0.5)
            scroller_container.style.display = "none";
        }
    }
    window.addEventListener('scroll', handleScroll);
    useEffect(() => {
        // console.log(location.pathname.split("/")[1]);
        // To hide the scroller when page changes
        setScrollHeight(window.scrollY);
        handleScroll();
        // eslint-disable-next-line
    }, [location, scrollHeight])

    // CHANGING USER ROUTE FOR NON-LOGGED IN USERS
    let userRoute = "";
    let authToken = localStorage.getItem('auth-token');
    // let authToken = localStorage.getItem('authToken');
    if (!authToken) {
        userRoute = "/login";
    }

    const handleThemeMode = (mode)=>{
        const linear_gradient ={
            dark: "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(255,252,252,0) 66%, rgba(255,255,255,0) 100%)",
            light: "linear-gradient(90deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%)",
            dark_mobile: "linear-gradient(90deg, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.2) 66%, rgba(0,0,0,0.2) 100%)",
            light_mobile: "linear-gradient(90deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%)",
            // LINEAR GRADIENT FOR MEDIADETAILS PAGE
            dark_lGradHero: "linear-gradient(to right, rgba(0,0,0,0.35) 100%, transparent 35%), linear-gradient(to left, rgba(0,0,0,0.4) 20%, transparent 40%), linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, transparent 30%), linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 20%)",
            light_lGradHero: "linear-gradient(to right, rgba(255,255,255,0.4) 100%, transparent 30%), linear-gradient(to left, rgba(255,255,255,0.4) 5%, transparent 15%), linear-gradient(to bottom, rgba(255,255,255,0.3) 20%, transparent 30%), linear-gradient(to top, rgba(255,255,255,0.5) 5%, transparent 20%)",
        }
        console.log(mode);
        switch (mode) {
            case "light":
                document.documentElement.style.setProperty("--bg-color", "white");
                document.documentElement.style.setProperty("--text-color", "black");
                document.documentElement.style.setProperty("--linear-gradient", linear_gradient.light);
                document.documentElement.style.setProperty("--linear-gradient-opacity", "0.3");
                document.documentElement.style.setProperty("--linear-gradient-mobile", linear_gradient.light_mobile);
                document.documentElement.style.setProperty("--lGradHero", linear_gradient.light_lGradHero);
                setThemeMode("light");
                break;
            case "dark":
                document.documentElement.style.setProperty("--bg-color", "black");
                document.documentElement.style.setProperty("--text-color", "white");
                document.documentElement.style.setProperty("--linear-gradient", linear_gradient.dark);
                document.documentElement.style.setProperty("--linear-gradient-opacity", "0.3");
                document.documentElement.style.setProperty("--linear-gradient-mobile", linear_gradient.dark_mobile);
                document.documentElement.style.setProperty("--lGradHero", linear_gradient.dark_lGradHero);
                setThemeMode("dark");
                break;
            default:
                setThemeMode("dark");
        }
    }

    return (
        <div className="navbar__stick">
            {/* Navbar Section  */}
            <nav className="navbar">
                <div className="navbar__container">
                    <div className="main-menu">
                        <Link to="/" id="navbar__logo">PrimeFlix</Link>
                        <div className="navbar__menu">
                            <ul className="menu-list">
                                <li className="navbar__item">
                                    <Link to="/" className={`navbar__links ${location.pathname === "/" ? "active" : ""}`} id="home-page">Home</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/movie" className={`navbar__links ${location.pathname === "/movie" ? "active" : ""}`} id="about-page">Movie</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/tv" className={`navbar__links ${location.pathname === "/tv" ? "active" : ""}`} id="services-page">Tv Series</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/categories/movies" className={`navbar__links button ${location.pathname === "/categories" ? "active" : location.pathname === "/categories/movies" ? "active" : location.pathname === "/categories/tv" ? "active" : ""}`} id="sign-up">Categories</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/search" className={`navbar__links ${location.pathname === "/search" ? "active" : ""}`} id="search"> &#128269; </Link>
                                </li>
                            </ul>
                            <div className="utils-container">
                                <div className={`mode_icons ${themeMode==="light" ? "hide" : ""}`}><span className="material-icons hover" onClick={ ()=> handleThemeMode("light")}>light_mode</span></div>
                                <div className={`mode_icons ${themeMode==="dark" ? "hide" : ""}`} ><span className="material-icons hover" onClick={ ()=> handleThemeMode("dark")}>dark_mode</span></div>
                                <div> <Link to={`/user${userRoute}`} className="utils-link"><span className="material-icons hover">account_circle</span></Link> </div>

                                <div className="favorite-container">
                                    {/* <Link to="/favorites" className="utils-link"> <span className="material-icons hover">favorite</span> </Link> */}
                                    <Link to="/favorites/movie" className="utils-link"> <span className="material-icons hover">favorite</span> </Link>
                                    <sup className="favorite-number"> {favoritesLen} </sup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar__toggle" id="mobile-menu" onClick={toogleMobileMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav