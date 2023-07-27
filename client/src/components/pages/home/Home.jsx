import React, { useEffect } from 'react';
import Hero from './homePage/Hero';
import Rental from './rentalSection/Rental';
import Channels from './channels/Channels';
import Utils from './homeUtils/Utils';

import utilsData from './homeUtils/UtilsData';
import LoadingBar from '../../utility/loadingBar/LoadingBar';

import { fetchHomeContent } from '../../../store/slices/HomeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Home = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.home);

  useEffect(() => {
    // dispatch(fetchHomeContent({pageType:"homepage", mediaType: "tv", page: 1}));
    if (state.isLoading === true) {
      // dispatch(fetchHomeContent({ mediaType: "movie", page: 1, params: "sort_by=popularity.desc" }));
      dispatch(fetchHomeContent({ mediaType: "movie", qs: {page: 1, sort_by: "popularity.desc"} }));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {/* <span style={{color: "white", fontSize: "10rem"}}>HOME</span> */}

      {state.isLoading === true && <LoadingBar />}

      {state.isLoading === false &&
        <div>
          <Hero />
          <Rental />
          <Channels />

          <Utils key="0" id="0" intro={utilsData.intro[0]} msg={utilsData.msg[0]} img={utilsData.img[0]} />
          <Utils key="1" id="1" intro={utilsData.intro[1]} msg={utilsData.msg[1]} img={utilsData.img[1]} />
          <Utils key="2" id="2" intro={utilsData.intro[2]} msg={utilsData.msg[2]} img={utilsData.img[2]} />
          <Utils key="3" id="3" intro={utilsData.intro[3]} msg={utilsData.msg[3]} img={utilsData.img[3]} />
        </div>
      }

    </div>
  )
}

export default Home