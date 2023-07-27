import React, { useEffect, useState } from 'react';
import "./content.css";
// import "../../styles/content.css";
import SliderCard from '../sliderCard/SliderCard';
import SliderFunctions from '../sliderFunctions/SliderFunctions';

const Content = (props) => {
    let [scrollPos, setScrollPos] = useState(0);

    // TO SHOW NUMBER OF CAST SLIDES
    let [contentCircle, setContentCircle] = useState(1); // to find which slide is currently visible
    let [slideNum, setSlideNum] = useState(new Array(1).fill("")); // to find total number of slides

    useEffect(() => {
        SliderFunctions.showHideArrow(props.content, scrollPos, "content");
        document.querySelector(`.content_count_circle.c${props.content}:nth-child(${contentCircle})`).style.opacity = 1;
        SliderFunctions.getSlideNum(props.content, "content", setSlideNum);
        // eslint-disable-next-line
    }, [scrollPos])

    window.addEventListener('resize', () => {
        SliderFunctions.handleResize("content", props.content, setScrollPos, setContentCircle, contentCircle);
    });

    function createCard(card) {
        return (
            <SliderCard
                key={card.id}
                id={card.id}
                img={card.poster_path}
                rating={card.vote_average}
                year={props.page === "movie" ? card.release_date : card.first_air_date}
                name={props.page === "movie" ? card.title : card.original_name}
                page={props.page}
            />
        );
    }

    const handleSlide = (val) => {
        SliderFunctions.handleSlide(props.content, setScrollPos, setContentCircle, "content", val);
    }

    return (
        <>
            <div className="content_container">
                <div className="content">
                    <div className="content_header"> <span className="header_container"> {props.title} </span> </div>
                    <div className="slider_container_content">
                        <button className={`left-arr_content arrow left-${props.content}`} onClick={() => handleSlide("left")}>&lt;</button>
                        <div className={`slider_wrapper_content wrapp-${props.content}`}>

                            {props.data.map(createCard)}

                        </div>

                        <button className={`right-arr_content arrow right-${props.content}`} onClick={() => handleSlide("right")}>&gt;</button>

                        <div className={`content_count_container c${props.content}`}>
                            {/* <span className="content_count_circle"></span> */}
                            {slideNum.map((arr, i) => <span key={i} className={`content_count_circle c${props.content}`}></span>)}
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Content