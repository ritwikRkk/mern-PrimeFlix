import { useEffect } from 'react';
import Test from "./components/test";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation
} from "react-router-dom";

import { results } from "./components/Data";

import { routes, elements } from "./routes/routes";
import { useDispatch } from 'react-redux';
import { getFavorites } from './store/slices/FavoriteSlice';
import favoriteApi from './api/modules/favorites.api';

import { userDetails } from './store/slices/UserSlice';
import userApi from './api/modules/user.api';

const App = () => {

  let authToken = null;
  let dispatch = useDispatch();

  const fetchFavorites = async (token) => {
    const favorites = await favoriteApi.getFavorites(token);
    // console.log(favorites);
    dispatch(getFavorites(favorites.favourites));
  }

  const fetchUser = async (token) => {
    let getUser = await userApi.userInfo(token);
    if (getUser.success) {
        // console.log(getUser);
        dispatch(userDetails({ _id: getUser.user._id, userName: getUser.user.username, email: getUser.user.email }));
        // setCredentials({ userName: user.username, email: user.email })
    } else {
        console.log(getUser.success, getUser.error)
    }
}

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    // eslint-disable-next-line
    authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetchUser(authToken);
      fetchFavorites(authToken);
    }
    // console.log(authToken);

    // window.addEventListener('resize', () => {
    //   // We execute the same script as before
    //   let vh = window.innerHeight * 0.01;
    //   document.documentElement.style.setProperty('--vh', `${vh}px`);
    //   // console.log(vh);
    // });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        {elements.nav}

        <Routes>

          {routes.map((route, index) => (
            route.nest === undefined ? <Route key={index} exact path={route.path} element={route.element} /> :
              <Route key={index} exact path={route.path} element={route.element}>
                <Route exact path={route.nestPath} element={route.nestElem} />
              </Route>
          ))}

          <Route exact path="*" element={<Test page="movie" content="1" data={results} />} />

        </Routes>

        {elements.footer}
        {elements.scroller}
        {/* <Test /> */}
      </Router>
    </>
  );
}

export default App;
