import React, { useEffect } from 'react';
// import React, { useState } from 'react';
import MediaHero from '../../utility/mediaSections/MediaHero';
// import Content from '../../utility/sliderContent/Content';
// import { results, results0, genres_list } from '../../Data';
// import { results, genres_list, genres } from '../../Data';
import MediaList from '../../utility/mediaList/MediaList';
import LoadingBar from '../../utility/loadingBar/LoadingBar';

import { fetchMovieContent } from '../../../store/slices/MovieSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Movie = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.movies);

  useEffect(() => {
    if (state.isLoading === true) {
      dispatch(fetchMovieContent({ mediaType: "movie", qs: {page: 1, sort_by: "popularity.desc"} }));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {state.isLoading === true && <LoadingBar />}
      {state.isLoading === false &&
        <div>
          {/* <span style={{fontSize: "5rem", color: "white"}}>LOADED</span> */}
          <MediaHero page="movie" results={state.movieContent} genre={state.movieGenre} />
          <MediaList page="movie" path="movie" data={state.movieContent} />
        </div>
      }
    </>
  )
}

export default Movie