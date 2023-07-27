import React, { useEffect } from 'react';
import "./castDetails.css";
// import "../../styles/castDetails.css";
import { useParams } from 'react-router-dom';
// import { castDetails } from '../../Data';
// import MediaList from '../../utility/mediaList/MediaList';
// import { results } from '../../Data';
import tmdbURL from '../../../api/urlConfigs/tmdbURL';
import { fetchCast } from '../../../store/slices/CastSlice';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import LoadingBar from '../../utility/loadingBar/LoadingBar';
import CastMedia from './castMedia/CastMedia';

const CastDetails = () => {
  const params = useParams();
  const castId = params.id;

  const dispatch = useDispatch();
  const state = useSelector(state => state.cast);

  useEffect(() => {
    dispatch(fetchCast({ castId }));
    // eslint-disable-next-line
  }, [castId])


  return (
    <>
      {(state[`${castId}isLoading`] === true || state[`${castId}isLoading`] === undefined) &&
        <LoadingBar />
      }

      {state[`${castId}isLoading`] === false &&
        <div>
          <div className="cast_details_container">
            <div className="cast_details">
              <div className="cast_img_container"> <img src={tmdbURL.posterPath(state.castDetails.profile_path)} alt="" /> </div>
              <div className="cast_info">
                <div className="cast_name"> <h2> {state.castDetails.name} ({new Date(state.castDetails.birthday).getFullYear()}) </h2> </div>
                <div className="genre_name_container"> <span> {state.castDetails.known_for_department} </span> </div>
                <p className="cast_description"> {state.castDetails.biography} </p>
              </div>

            </div>
          </div>
          <CastMedia />
        </div>
      }
    </>
  )
}

export default CastDetails