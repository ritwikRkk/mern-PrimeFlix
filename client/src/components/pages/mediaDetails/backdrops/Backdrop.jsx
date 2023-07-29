import React, { useEffect, useState } from 'react';
// import "../../../styles/backdrop.css";
// import { images } from '../../../Data';
import SliderFunctions from '../../../utility/functions/SliderFunctions';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux';

const Backdrop = (props) => {
    // let imgUrl = "https://image.tmdb.org/t/p/original";
    const backdrops = useSelector(state => state.md.mdBackdrops);
    let backdropArr = backdrops.slice(0, 20);
    const [backdropCircle, setBackdropCircle] = useState(1);

    let [scrollPos, setScrollPos] = useState(0);
    useEffect(() => {
        SliderFunctions.showHideArrow(props.mediaId, scrollPos, "backdrop");
        document.querySelector(`.backdrop_count_circle:nth-child(${backdropCircle})`).style.opacity = 1;
        // eslint-disable-next-line
    }, [scrollPos])

    useEffect(() => {
        setTimeout(() => {
            SliderFunctions.showHideArrow(props.mediaId, scrollPos, "backdrop");
        }, 500); // 500 seconds delay to load the entire backdrop images
        // eslint-disable-next-line
    }, [])

    window.addEventListener('resize', () => {
        SliderFunctions.handleResize("backdrop", props.mediaId, setScrollPos, setBackdropCircle, backdropCircle);
    });

    const handleSlide = (val) => {
        SliderFunctions.handleSlide(props.mediaId, setScrollPos, setBackdropCircle, "backdrop", val);
    }

    const createBackdropGrid = (img, i) => {
        return (
            
                <img className="backdrop_img" key={i} src={tmdbURL.backdropPath(img.file_path)} alt="" />
                // <img className="backdrop_img" key={img.file_path} src={`${imgUrl}${img.file_path}`} alt="" />
        )

    }

    return (
        <div className="backdrop_container">
            <div className="backdrop">
                <div className="backdrop_header"> <span className="header_container"> Backdrops </span> </div>
                <div className="slider_container_backdrop">
                    <button className={`left-arr_backdrop arrow left-${props.mediaId}`} onClick={() => handleSlide("left")}>&lt;</button>
                    <div className={`slider_wrapper_backdrop wrapp-${props.mediaId}`}>

                        {backdropArr.map(createBackdropGrid)}

                    </div>

                    <button className={`right-arr_backdrop arrow right-${props.mediaId}`} onClick={() => handleSlide("right")}>&gt;</button>
                    <div className="backdrop_count_container">
                        {backdropArr.map((backdrop, i) => <span key={i} className="backdrop_count_circle"></span>)}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Backdrop