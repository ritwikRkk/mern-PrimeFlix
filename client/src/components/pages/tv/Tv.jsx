import React, { useEffect } from 'react';
import MediaHero from '../../utility/mediaSections/MediaHero';
// import Content from '../../utility/sliderContent/Content';
// import { tvResults0, tvResults1, tvGenre_list } from '../../Data';
// import { tvResults0, tvGenre_list } from '../../Data';
import MediaList from '../../utility/mediaList/MediaList';
import LoadingBar from '../../utility/loadingBar/LoadingBar';

import { fetchTvContent } from '../../../store/slices/TvSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Tv = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.tv);

  useEffect(() => {
    if (state.isLoading === true) {
      dispatch(fetchTvContent({ mediaType: "tv", qs: {page: 1, sort_by: "popularity.desc"} }));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {state.isLoading === true && <LoadingBar />}
      {state.isLoading === false &&
        <div>
          <MediaHero page="tv" results={state.tvContent} genre={state.tvGenre} />
          <MediaList page="tv" path="tv" data={state.tvContent} />
        </div>
      }
    </>
  )
}

export default Tv;