import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import "../../../styles/castSlider.css";
// import { Link } from 'react-router-dom';
import CastCard from '../castCard/CastCard';
import SliderFunctions from '../../../utility/functions/SliderFunctions';

const Castslider = (props) => {
  let [scrollPos, setScrollPos] = useState(0);
  // TO SHOW NUMBER OF CAST SLIDES
  let [castCircle, setCastCircle] = useState(1); // to find which slide is currently visible
  let [slideNum, setSlideNum] = useState(new Array(1).fill("")); // to find total number of slides

  useEffect(() => {
    SliderFunctions.showHideArrow(props.mediaId, scrollPos, "cast");
    document.querySelector(`.cast_count_circle:nth-child(${castCircle})`).style.opacity = 1;
    SliderFunctions.getSlideNum(props.mediaId, "cast", setSlideNum);
    // eslint-disable-next-line
  }, [scrollPos]);

  window.addEventListener('resize', () => {
    SliderFunctions.handleResize("cast", props.mediaId, setScrollPos, setCastCircle, castCircle);
  });

  const handleSlide = (val) => {
    SliderFunctions.handleSlide(props.mediaId, setScrollPos, setCastCircle, "cast", val);
  }

  let castsArr = useSelector(state => state.md.mdCast);
  // console.log({castsArr, width:window.innerWidth});
  if(window.innerWidth <= 400){
    castsArr = castsArr.slice(0,40)
  }

  return (
    <div className="cast_container">
      <div className="cast">
        <div className="cast_header"> <span className="header_container"> CAST {props.media} </span> </div>
        <div className="slider_container_cast">
          <button className={`left-arr_cast arrow left-${props.mediaId}`} onClick={() => handleSlide("left")}>&lt;</button>
          <div className={`slider_wrapper_cast wrapp-${props.mediaId}`}>

            {castsArr.map((cast) => {
              return (
                <CastCard key={cast.id} id={cast.id} name= {cast.name} img={cast.profile_path} />
              )
            })}

          </div>

          <button className={`right-arr_cast arrow right-${props.mediaId}`} onClick={() => handleSlide("right")}>&gt;</button>
          <div className="cast_count_container">
            {/* <span className="cast_count_circle"></span> */}
            {slideNum.map((arr, i) => <span key={i} className="cast_count_circle"></span>)}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Castslider