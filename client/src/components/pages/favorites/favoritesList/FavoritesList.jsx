import React from 'react';
import { useParams } from 'react-router-dom';
import MediaList from '../../../utility/mediaList/MediaList';
// import { results, tvResults0 } from '../../../Data';
import { useSelector } from 'react-redux';

const FavoritesList = () => {

  const favorites = useSelector(state => state.favorites.favoritesArr);
  let authToken = localStorage.getItem('auth-token');

  const params = useParams();
  const mediaType = params.mediaType;
  let contentData = "";
  if (mediaType === "movie") {
    let movieFav = favorites.filter((fav) => {
      return fav.mediaType === "movie";
    })
    contentData = movieFav;
    // console.log(movieFav);
  } else {
    let tvFav = favorites.filter((fav) => {
      return fav.mediaType === "tv";
    })
    contentData = tvFav;
  }

  let divStyle = {
    height: "200px",
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    textAlign: "center",
    padding: "15px",
  }

  return (
    <div style={authToken === null ? divStyle : {}}>
      {authToken !== null && mediaType === "movie" && <MediaList page="favorites" pageType={mediaType} data={contentData} />}
      {authToken !== null && mediaType === "tv" && <MediaList page="favorites" pageType={mediaType} data={contentData} />}

      {authToken === null && <div className="empty_favorite">
        No Favorites Exists! LogIn/SignUp First.
      </div>}
    </div>
  )
}

export default FavoritesList;