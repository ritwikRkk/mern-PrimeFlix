import React, { useState, useEffect } from 'react'
import "./sliderCard.css";
// import "../../styles/sliderCard.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import favoriteApi from '../../../api/modules/favorites.api';
import { addFavorite, removeFavorite } from '../../../store/slices/FavoriteSlice';
import LoadingCircular from '../loadingCircle/LoadingCircular';
import tmdbURL from '../../../api/urlConfigs/tmdbURL';

const SliderCard = (props) => {
  const dispatch = useDispatch();
  const { id, img, rating, year, name, page } = props;
  const [highlight, setHightlight] = useState(false);
  const [favId, setFavId] = useState(null);
  const [loading, setLoading] = useState(false);

  const favorites = useSelector(state => state.favorites.favoritesArr);
  let favArr = [];
  if (favorites.length > 0) {
    favArr = favorites.filter((fav) => {
      return fav.mediaType === page;
    })

  }

  const checkFav = (favId) => {
    for (let val of favArr) {
      if (val.mediaId === String(favId)) {
        setFavId(val._id);
        return true;
      }
      // console.log("checkFav called");
    }
  }

  useEffect(() => {
    let fav = checkFav(id);
    if (fav) {
      setHightlight(true);
    } else {
      setHightlight(false);
    }
    // eslint-disable-next-line
  }, [])

  const createFavorites = async (authToken) => {
    let favData = {
      "mediaId": id,
      "mediaType": page,
      "mediaTitle": name,
      "mediaPoster": img,
      "mediaRating": rating,
      "release_date": year
    }
    // let authToken = localStorage.getItem('auth-token');

    let data = await favoriteApi.addFavorites(favData, authToken);
    return data;

  }

  const removeFavorites = async (favId, authToken) => {
    let data = await favoriteApi.deleteFavorites(favId, authToken);
    return data;
  }

  const handleFav = async () => {

    let authToken = localStorage.getItem('auth-token');
    if (authToken) {
      // ALREADY FAVORITES
      if (highlight && favId) {
        setLoading(true);
        // console.log("delete favorite", favId);
        let data = await removeFavorites(favId, authToken);
        setTimeout(() => {
          if (data.success) {
            // console.log(data, favId);
            dispatch(removeFavorite(favId));
            setFavId(null);
            setHightlight(false);
            setLoading(false);
          }
        }, 2000);
      }

      // ADD FAVORITES
      else {
        setLoading(true);
        let data = await createFavorites(authToken);
        // console.log(data);
        setTimeout(() => {
          if (data.success) {
            // console.log(data);
            dispatch(addFavorite(data.newFavourite));
            setFavId(data.newFavourite._id)
            setHightlight(true);
            setLoading(false);
          }
        }, 2000);
      }
    }else{
      console.log("Please Login or Sign Up first to add favorites");
    }
  }


  return (
    <>
      <div className="slider_card_container">
        <div className="slider_img_container"> <img className="" src={tmdbURL.posterPath(img)} alt="" /> </div>
        <div className="slider_card_details">
          <div className="slider_favorite_container">
            <Link className="links favorite" to="">
              {loading === false && <span onClick={handleFav} className={`material-icons ${highlight === true ? "fav_highlight" : ""}`}>favorite</span>}
              {loading === true && <LoadingCircular />}
            </Link>
          </div>

          <div className="slider_card-media_link"> <Link className="links watch_now" to={`/${page}/${id}`}> <span className="material-icons">play_circle</span> </Link> </div>

          <div className="slider_card-media_info">
            <div className="slider_card-media_utils">
              <div className="slider_card-media_rating utils"> <span className="material-icons">star_half</span> <span> {rating} </span> </div>
              <div className="slider_card-media_release_year utils"> <span className="material-icons">calendar_month</span> <span> {new Date(year).getFullYear()} </span> </div>
            </div>
            <div className="slider_card-media_name"> <span> {name} </span> </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default SliderCard