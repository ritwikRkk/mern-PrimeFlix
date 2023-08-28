import React, { useState, useEffect } from 'react'
import "./mediaCard.css";
// import "../../../styles/mediaCard.css";
import { Link } from 'react-router-dom';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import favoriteApi from '../../../../api/modules/favorites.api';
// import { addFavorite, removeFavorite } from '../../../../store/slices/FavoriteSlice';
import LoadingCircular from '../../loadingCircle/LoadingCircular';
import { getFavArr, checkFav, favoriteHandler } from '../../functions/FavoriteFunctions';
import { deleteMsg, msgDetails } from '../../../../store/slices/MsgSlice';

const MediaCard = (props) => {
  const dispatch = useDispatch();
  const { id, img, rating, year, name, page } = props;
  const [highlight, setHightlight] = useState(false);
  const [favId, setFavId] = useState(null);
  const [loading, setLoading] = useState(false);

  const favorites = useSelector(state => state.favorites.favoritesArr);
  // let favArr = [];

  let favArr = getFavArr(favorites, page);

  useEffect(() => {
    let fav = checkFav(id, favArr, setFavId);
    if (fav) {
      setHightlight(true);
    } else {
      setHightlight(false);
    }
    // eslint-disable-next-line
  }, [])

  const handleFav = async () => {

    let authToken = localStorage.getItem('auth-token');
    if (authToken) {
      const fnDetails = { highlight, favId, setLoading, authToken, setFavId, setHightlight, dispatch };
      favoriteHandler(fnDetails, props);
    } else {
      dispatch(msgDetails({ msgType: "failed", msgContent: "Please Login or Sign Up first to add favorites" }))
      setTimeout(() => dispatch(deleteMsg()), 3000);
      // console.log("Please Login or Sign Up first to add favorites");
    }

  }


  return (
    <>
      <div className="media_card_container">
        <div className="media_card-poster_img"> <img src={tmdbURL.posterPath(img)} alt="" /> </div>
        <div className="media_card ">
          <div className="media_details_conainer">
            <div className="media_card-media_info_container">
              <div className="media_card-media_link"> <Link className="links watch_now" to={`/${page}/${id}`}> <span className="material-icons">play_circle</span> </Link> </div>
              <div className="media_card-media_info">
                <div className="media_card-media_utils">
                  <div className="media_card-media_rating utils"> <span className="material-icons">star_half</span> <span> {rating} </span> </div>
                  <div className="media_card-media_release_year utils"> <span className="material-icons">calendar_month</span> <span> {new Date(year).getFullYear()} </span> </div>
                </div>
                <div className="media_card-media_name"> <span> {name} </span> </div>
              </div>
              <div className="media_favorite_container">
                <span className="links favorite">
                  {loading === false && <span onClick={handleFav} className={`material-icons ${highlight === true ? "fav_highlight" : ""}`}>favorite</span>}
                  {loading === true && <LoadingCircular />}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default MediaCard