import Home from "../components/pages/home/Home";
import Movie from "../components/pages/movie/Movie";
import Tv from "../components/pages/tv/Tv";
import MediaDetails from "../components/pages/mediaDetails/MediaDetails";
import SearchPage from "../components/pages/search/searchPage/SearchPage";
import UserDetails from "../components/pages/user/userDetails/UserDetails";
import SignUp from "../components/pages/user/signup/SignUp";
import Login from "../components/pages/user/login/Login";
import ChangePassword from "../components/pages/user/changePass/ChangePassword";
import About from "../components/pages/footerPage/About";
import Terms from "../components/pages/footerPage/Terms";
import Privacy from "../components/pages/footerPage/Privacy";
import Contact from "../components/pages/footerPage/Contact";
import CastDetails from "../components/pages/castDetails/CastDetails";
import Categories from "../components/pages/category/Categories";
import CatMedia from "../components/pages/category/CatMedia";
import Favorites from "../components/pages/favorites/Favorites";
import FavoritesList from "../components/pages/favorites/favoritesList/FavoritesList";
import Nav from "../components/navbar/Nav";
import Footer from "../components/footer/Footer";
import Scroller from "../components/scroller/Scroller";
// import { useSelector } from "react-redux";

// const state = useSelector(state => state.media);


const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/movie",
        element: <Movie />
    },
    {
        path: "/movie/:id",
        element: <MediaDetails />
    },
    {
        path: "/tv",
        element: <Tv />
    },
    {
        path: "/tv/:id",
        element: <MediaDetails />
    },
    {
        path: "/search",
        element: <SearchPage />
    },
    {
        path: "/user",
        element: <UserDetails />
    },
    {
        path: "/user/signup",
        element: <SignUp />
    },
    {
        path: "/user/login",
        element: <Login />
    },
    {
        path: "/user/changepassword",
        element: <ChangePassword />
    },
    {
        path: "/about-us",
        element: <About />
    },
    {
        path: "/terms",
        element: <Terms />
    },
    {
        path: "/privacy",
        element: <Privacy />
    },
    {
        path: "/contact-us",
        element: <Contact />
    },
    {
        path: "/cast/:id",
        element: <CastDetails />
    },
    {
        nest: true,
        path: "/categories",
        nestPath: ":mediaType",
        element: <Categories />,
        nestElem: <CatMedia />
    },
    {
        nest: true,
        path: "/favorites",
        nestPath: ":mediaType",
        element: <Favorites />,
        nestElem: <FavoritesList />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "*",
        element: <Home />
    },
    
]

const elements = {
    nav: <Nav />,
    footer: <Footer />,
    scroller: <Scroller />
}

export { routes, elements };