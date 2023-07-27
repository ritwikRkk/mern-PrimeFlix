import React, { useEffect, useState, forwardRef } from 'react';
// import "../../../styles/videos.css";
// import { images } from '../../../Data';
import SliderFunctions from '../../../utility/sliderFunctions/SliderFunctions';
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
import { useSelector } from 'react-redux';

const Videos = (props, ref) => {

    const videos = useSelector(state => state.md.mdVideos);
    let videosArr = videos.slice(0, 10);
    // let imgUrl = "https://image.tmdb.org/t/p/original";
    const [videosCircle, setVideosCircle] = useState(1);

    let [scrollPos, setScrollPos] = useState(0);
    useEffect(() => {
        SliderFunctions.showHideArrow(props.mediaId, scrollPos, "videos");
        document.querySelector(`.videos_count_circle:nth-child(${videosCircle})`).style.opacity = 1;
        // eslint-disable-next-line
    }, [scrollPos])

    useEffect(() => {
        setTimeout(() => {
            SliderFunctions.showHideArrow(props.mediaId, scrollPos, "videos");
        }, 500); // 500 seconds delay to load the entire videos images
        // eslint-disable-next-line
    }, [])

    window.addEventListener('resize', () => {
        SliderFunctions.handleResize("videos", props.mediaId, setScrollPos, setVideosCircle, videosCircle);
    });

    const handleSlide = (val) => {
        SliderFunctions.handleSlide(props.mediaId, setScrollPos, setVideosCircle, "videos", val);
    }

    const createVideosGrid = (vid, i) => {
        return (
            <iframe className="videos_iframe" key={i} src={tmdbURL.youtubePath(vid.key)} title="YouTube video player" frameBorder="0" controls allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            // <iframe className="videos_iframe" key={i} src="https://www.youtube.com/embed/GXWfue9VhTY" title="YouTube video player" frameBorder="0" controls allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        )

    }

    return (
        <>
                <div className="videos_container" ref={ref}>
                    <div className="videos">
                        <div className="videos_header"> <span className="header_container"> Videos </span> </div>
                        <div className="slider_container_videos">
                            <button className={`left-arr_videos arrow left-${props.mediaId}`} onClick={() => handleSlide("left")}>&lt;</button>
                            <div className={`slider_wrapper_videos wrapp-${props.mediaId}`}>

                                {videosArr.map(createVideosGrid)}

                            </div>

                            <button className={`right-arr_videos arrow right-${props.mediaId}`} onClick={() => handleSlide("right")}>&gt;</button>
                            <div className="videos_count_container">
                                {videosArr.map((img, i) => <span key={i} className="videos_count_circle"></span>)}
                            </div>

                        </div>
                    </div>

                </div>
        </>
    )
}

export default forwardRef(Videos)