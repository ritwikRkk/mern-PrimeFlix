import React, { useState, useEffect, useRef } from 'react';
import "./nav.css";
// import "../styles/nav.css";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toggleMobileMenu, handleScroll, handleThemeMode } from '../utility/navFunction/NavFunction';

const Nav = () => {
    const favoritesLen = useSelector(state => state.favorites.favoritesArr.length);
    // console.log(favoritesLen);
    const [themeMode, setThemeMode] = useState("dark");
    let menuRef = useRef();

    let [scrollHeight, setScrollHeight] = useState(0);
    let location = useLocation();

    window.addEventListener('scroll', () => {
        handleScroll(scrollHeight, setScrollHeight, location)
    });

    useEffect(() => {
        // To hide the scroller when page changes
        setScrollHeight(window.scrollY);
        handleScroll(scrollHeight, setScrollHeight, location)
        // eslint-disable-next-line
    }, [location, scrollHeight])

    useEffect(() => {
        // whenever location changes scroll to top of the page
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [location])

    // CHANGING USER ROUTE FOR NON-LOGGED IN USERS
    let userRoute = "";
    let authToken = localStorage.getItem('auth-token');
    // let authToken = localStorage.getItem('authToken');
    if (!authToken) {
        userRoute = "/login";
    }

    useEffect(() => {
        // close mobile menu when clicked outside of it
        let closeMobileMenu = (event) => {
            if (!menuRef.current.contains(event.target) && event.target.id !== "bar") {
                const navToggle = document.querySelector('.navbar__toggle');
                const navMenu = document.querySelector('.navbar__menu');

                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        document.addEventListener("click", closeMobileMenu);
    }, [])


    return (
        <div className="navbar__stick">
            {/* Navbar Section  */}
            <nav className="navbar">
                <div className="navbar__container">
                    <div className="main-menu">
                        <Link to="/" id="navbar__logo">PrimeFlix</Link>
                        <div className="navbar__menu" id="mobile-menu" ref={menuRef}>
                            <ul className="menu-list">
                                <li className="navbar__item">
                                    <Link to="/" onClick={toggleMobileMenu} className={`navbar__links ${location.pathname === "/" ? "active" : ""}`} id="home-page">Home</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/movie" onClick={toggleMobileMenu} className={`navbar__links ${location.pathname === "/movie" ? "active" : ""}`} id="about-page">Movie</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/tv" onClick={toggleMobileMenu} className={`navbar__links ${location.pathname === "/tv" ? "active" : ""}`} id="services-page">Tv Series</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/categories/movies" onClick={toggleMobileMenu} className={`navbar__links button ${location.pathname === "/categories" ? "active" : location.pathname === "/categories/movies" ? "active" : location.pathname === "/categories/tv" ? "active" : ""}`} id="sign-up">Categories</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/search" onClick={toggleMobileMenu} className={`navbar__links ${location.pathname === "/search" ? "active" : ""}`} id="search"> &#128269; </Link>
                                </li>
                            </ul>
                            <div className="utils-container">
                                <div className={`mode_icons ${themeMode === "light" ? "hide" : ""}`} onClick={toggleMobileMenu}><span className="material-icons hover" onClick={() => handleThemeMode("light", setThemeMode)}>light_mode</span></div>
                                <div className={`mode_icons ${themeMode === "dark" ? "hide" : ""}`} onClick={toggleMobileMenu} ><span className="material-icons hover" onClick={() => handleThemeMode("dark", setThemeMode)}>dark_mode</span></div>
                                <div> <Link to={`/user${userRoute}`} className="utils-link" onClick={toggleMobileMenu}><span className="material-icons hover">account_circle</span></Link> </div>

                                <div className="favorite-container">
                                    {/* <Link to="/favorites" className="utils-link"> <span className="material-icons hover">favorite</span> </Link> */}
                                    <Link onClick={toggleMobileMenu} to="/favorites/movie" className="utils-link"> <span className="material-icons hover">favorite</span> </Link>
                                    <sup className="favorite-number"> {favoritesLen} </sup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar__toggle" id="bar" onClick={toggleMobileMenu}>
                        <span className="bar" id="bar"></span>
                        <span className="bar" id="bar"></span>
                        <span className="bar" id="bar"></span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav