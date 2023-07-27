// import React, { useEffect, useState } from 'react';
import React, { useRef, useEffect } from 'react';
import Hero from './hero/Hero';
import { useParams, useLocation } from 'react-router-dom';
// import { results, tvResults0, genres_list, tvGenre_list } from '../../Data';
// import CastSlider from './castSlider/CastSlider';
import "./mediaDetails.css";
// import "../../styles/mediaDetails.css";
import Castslider from './castSlider/CastSlider';
import Backdrop from './backdrops/Backdrop';
import Poster from './poster/Poster';
import Videos from './videos/Videos';
import Reviews from './reviews/userReviews/Reviews';
import Content from '../../utility/sliderContent/Content';
import LoadingBar from '../../utility/loadingBar/LoadingBar';

import { fetchMd } from '../../../store/slices/mediaDetailsSlice';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import WriteReview from './reviews/writeReview/WriteReview';

const MediaDetails = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.md);

  // const videosLen = useSelector(state => state.md.mdVideos.length);
  const castLen = state.mdCast.length;
  const posterLen = state.mdPosters.length;
  const backdropLen = state.mdBackdrops.length;
  const videosLen = state.mdVideos.length;
  const recommendationsLen = state.mdRecommendations.length;
  const reviewsLen = state.mdReviews.length;

  // console.log(videosLen);

  let location = useLocation();
  let path = location.pathname.split("/")[1];

  const params = useParams();
  const mediaId = Number(params.id);

  // SCROLL TO VIDEO COMPONENT
  const scrollRef = useRef(null);
  const handleClick = () => {
    // console.log("ref")
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(fetchMd({ mediaType: path, mediaId: mediaId }));
    // console.log(state[`${mediaId}isLoading`])
    // eslint-disable-next-line 
  }, [mediaId])


  return (
    <>
      {(state[`${mediaId}isLoading`] === true || state[`${mediaId}isLoading`] === undefined) &&
        <LoadingBar />
      }
      
      {state[`${mediaId}isLoading`] === false &&
        <div>
          <Hero mediaDetail={state.mdContent} page={path} click={handleClick} />
          {castLen>0 && <Castslider mediaId={mediaId} />}
          {posterLen>0 && <Poster mediaId={mediaId} />}
          {backdropLen>0 && <Backdrop mediaId={mediaId} />}
          {videosLen>0 && <Videos mediaId={mediaId} ref={scrollRef} />}
          {reviewsLen>0 && <Reviews mediaId={mediaId} revLen={reviewsLen} />}
          <WriteReview />
          {recommendationsLen>0 && <Content title="Recommendations" page={path} content="0" data={state.mdRecommendations.slice(0, 20)} />}

          {/* <Cast /> */}
        </div>
      }
    </>
  )
}

export default MediaDetails