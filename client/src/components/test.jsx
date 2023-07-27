import React, { useEffect, useState } from 'react';
// import "../css/test.css";
// import "./test.css";
import { Link } from 'react-router-dom';
import { dataArray } from './Data';
import tmdbURL from '../api/urlConfigs/tmdbURL';

const Test = (props) => {

  let data = props.data;

  let [grid, setGrid] = useState({ columns: 4, rows: 1 });
  let [mediaData, setMediaData] = useState(props.data.slice(0, grid.columns * grid.rows));

  const setGridVal = () => {
    // console.log('setGrid');
    let clientWidth = window.screen.availWidth;;
    if (clientWidth > 900 && grid.columns !== 4 && grid.rows !== 1) {
      // console.log(">900");
      setGrid({ columns: 4, rows: 1 });
      setMediaData(props.data.slice(0, 4 * 1))
    }
    if (clientWidth < 900 && grid.columns !== 3 && grid.rows !== 2) {
      // console.log("900");
      setGrid({ columns: 3, rows: 2 });
      setMediaData(props.data.slice(0, 3 * 2))

      // columns = 3;
    }
    if (clientWidth <= 600 && grid.columns !== 2 && grid.rows !== 2) {
      // console.log("600");
      setGrid({ columns: 2, rows: 2 });
      setMediaData(props.data.slice(0, 2 * 2))

      // columns = 2;
    }
  }
  useEffect(() => {
    setGridVal();
    // eslint-disable-next-line
  }, [])
  // window.addEventListener("resize", setGridVal);

  let infiniteScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let innerHeight = window.innerHeight;
    let scrollTop = Math.round(document.documentElement.scrollTop);
    let footerHeight = document.querySelector("footer").clientHeight - 20;

    if ((scrollTop + innerHeight) >= (scrollHeight - footerHeight)) {  // -2 for decimal errors
      // console.log("Reached bottom");
      let newData = data.slice(mediaData.length, mediaData.length + grid.columns * grid.rows);
      setMediaData(mediaData.concat(newData));
    }

  }
  window.addEventListener("scroll", infiniteScroll);

  useEffect(() => {
    // console.log(typeof(dataArray[0]));
    // let jsonObject = dataArray.map(JSON.stringify);
    // let uniqueSet = new Set(jsonObject);
    // let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    // console.log(uniqueArray);

    let data = dataArray.filter((item)=> {
      return item.id === 1130818;
    });
    console.log(data);
  }, [])
  

  const MediaCard = (props) => {
    return (
      <>
        <div className="media_card_container">
          <div className="media_card-poster_img"> <img src={tmdbURL.posterPath(props.img)} alt="" /> </div>
          <div className="media_card ">
            <div className="media_details_conainer">
              <div className="media_card-media_info_container">
                <div className="media_card-media_link"> <Link className="links watch_now" to={`/${props.page}/${props.id}`}> <span className="material-icons">play_circle</span> </Link> </div>
                <div className="media_card-media_info">
                  <div className="media_card-media_utils">
                    <div className="media_card-media_rating utils"> <span className="material-icons">star_half</span> <span> {props.rating} </span> </div>
                    <div className="media_card-media_release_year utils"> <span className="material-icons">calendar_month</span> <span> {new Date(props.year).getFullYear()} </span> </div>
                  </div>
                  <div className="media_card-media_name"> <span> {props.name} </span> </div>
                </div>
                <div className="media_favorite_container"> <Link className="links favorite" to="/fav"> <span className="material-icons">favorite</span> </Link> </div>
              </div>

            </div>
          </div>
        </div>
      </>

    )
  }

  const createMediaCard = (mediaCard) => {
    return (
      <MediaCard
        key={mediaCard.id}
        id={mediaCard.id}
        img={mediaCard.poster_path}
        rating={mediaCard.vote_average}
        year={props.page === "movie" ? mediaCard.release_date : mediaCard.first_air_date}
        name={props.page === "movie" ? mediaCard.title : mediaCard.original_name}
        page={props.page}
      />
    );
  }
  // const createMediaCard = (mediaCard) => {
  //   return (
  //     <div className="media" key={mediaCard.id}>
  //       <MediaCard
  //         key={mediaCard.id}
  //         id={mediaCard.id}
  //         img={mediaCard.poster_path}
  //         rating={mediaCard.vote_average}
  //         year={props.page === "movie" ? mediaCard.release_date : mediaCard.first_air_date}
  //         name={props.page === "movie" ? mediaCard.title : mediaCard.original_name}
  //         page={props.page}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div style={{ height: "100vh", color: "white" }} className="test_container">TEST</div>

      <div className={`media_list_container ${props.page}`}>
        <div className="media_list">
          {mediaData.map(createMediaCard)}
        </div>
      </div>

    </>
  )
}

export default Test