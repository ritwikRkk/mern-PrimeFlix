import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Content from '../../utility/sliderContent/Content';
// import { results, results0 } from '../../Data';
// import { tvResults0, tvResults1 } from '../../Data';
import { fetchCatMovieContent } from '../../../store/slices/CatMovieSlice';
import { fetchCatTvContent } from '../../../store/slices/catTvSlice';
import LoadingBar from '../../utility/loadingBar/LoadingBar';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const CatMedia = () => {
  const dispatch = useDispatch();
  const catMovie = useSelector(state => state.catMovie);
  const catTv = useSelector(state => state.catTv);

  const params = useParams();
  const mediaType = params.mediaType;
  // console.log(mediaType);
  if (mediaType === "movies") {

  }

  useEffect(() => {
    if (mediaType === "movies" && catMovie.isLoading === true) {
      dispatch(fetchCatMovieContent({ mediaType: "movie", qs: {page: 1} }));
    }
    else if (mediaType === "tv" && catTv.isLoading === true) {
      dispatch(fetchCatTvContent({ mediaType: "tv", qs: {page: 1} }));
    }
    // eslint-disable-next-line
  }, [mediaType])


  return (
    <>
      {
        ((catMovie.isLoading === true && mediaType === "movies") || (catTv.isLoading === true && mediaType === "tv")) &&
        <LoadingBar />
      }

      {(catMovie.isLoading === false && mediaType === "movies") &&
        <div>
          {mediaType === "movies" && <Content page="movie" title="Action" content="0" data={catMovie.actionContent} />}
          {mediaType === "movies" && <Content page="movie" title="Comedy" content="1" data={catMovie.comedyContent} />}
          {mediaType === "movies" && <Content page="movie" title="Animation" content="2" data={catMovie.animationContent} />}
          {mediaType === "movies" && <Content page="movie" title="Crime" content="3" data={catMovie.crimeContent} />}
          {mediaType === "movies" && <Content page="movie" title="Drama" content="4" data={catMovie.dramaContent} />}
        </div>
      }

      {(catTv.isLoading === false && mediaType === "tv") &&
        <div>
          {mediaType === "tv" && <Content page="tv" title="Action" content="0" data={catTv.actionContent} />}
          {mediaType === "tv" && <Content page="tv" title="Comedy" content="1" data={catTv.comedyContent} />}
          {mediaType === "tv" && <Content page="tv" title="Animation" content="2" data={catTv.animationContent} />}
          {mediaType === "tv" && <Content page="tv" title="Crime" content="3" data={catTv.crimeContent} />}
          {mediaType === "tv" && <Content page="tv" title="Drama" content="4" data={catTv.dramaContent} />}
        </div>
      }

    </>

  )
}

export default CatMedia;