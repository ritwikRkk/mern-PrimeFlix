import React, { useEffect, useState } from 'react';
// import "../../../styles/poster.css";
// import CastCard from '../castCard/CastCard';
// import { images } from '../../../Data';
import SliderFunctions from '../../../utility/functions/SliderFunctions';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux';

const Poster = (props) => {

    // let imgUrl = "https://image.tmdb.org/t/p/original/";
    const poster = useSelector(state => state.md.mdPosters);
    let posterArr = poster.slice(0, 30);
    let [scrollPos, setScrollPos] = useState(0);

    // TO SHOW NUMBER OF CAST SLIDES
    let [posterCircle, setPosterCircle] = useState(1); // to find which slide is currently visible
    let [slideNum, setSlideNum] = useState(new Array(1).fill("")); // to find total number of slides

    useEffect(() => {
        SliderFunctions.showHideArrow(props.mediaId, scrollPos, "poster");
        document.querySelector(`.poster_count_circle:nth-child(${posterCircle})`).style.opacity = 1;
        SliderFunctions.getSlideNum(props.mediaId, "poster", setSlideNum);
        // eslint-disable-next-line
    }, [scrollPos]);

    window.addEventListener('resize', () => {
        SliderFunctions.handleResize("poster", props.mediaId, setScrollPos, setPosterCircle, posterCircle);
    });

    const handleSlide = (val) => {
        SliderFunctions.handleSlide(props.mediaId, setScrollPos, setPosterCircle, "poster", val);
    }

    const createPosterGrid = (poster) => {
        return (
            <div className="poster_card" key={poster.file_path}>
                {/* <img className="poster_img" src={`${imgUrl}${poster.file_path}`} alt="" /> */}
                <img className="poster_img" src={tmdbURL.posterPath(poster.file_path)} alt="" />
            </div>
        )
    }

    return (
        <div className="poster_container">
            <div className="poster">
                <div className="poster_header"> <span className="header_container"> poster {props.media} </span> </div>
                <div className="slider_container_poster">
                    <button className={`left-arr_poster arrow left-${props.mediaId}`} onClick={() => handleSlide("left")}>&lt;</button>
                    <div className={`slider_wrapper_poster wrapp-${props.mediaId}`}>
                        {/* {posterArr.length} */}
                        {posterArr.map(createPosterGrid)}

                    </div>

                    <button className={`right-arr_poster arrow right-${props.mediaId}`} onClick={() => handleSlide("right")}>&gt;</button>
                    <div className="poster_count_container">
                        {/* <span className="cast_count_circle"></span> */}
                        {slideNum.map((arr, i) => <span key={i} className="poster_count_circle"></span>)}
                    </div>

                </div>
            </div>
            

        </div>
    )
}

export default Poster;