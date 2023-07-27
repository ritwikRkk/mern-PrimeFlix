import React from 'react';
import "./utils.css";
// import "../../../styles/utils.css";

const Utils = (props) => {
    return (
        // <div className="utils_container" style={{flexDirection: (props.id%2 === 1) ? "row-reverse" : ""}}>
        <div className={`utils_container ${props.id%2 === 1 ? "fd-rev" : ""}`}>
            <div className="utils_info">
                <div className="utils_intro">
                    <h2> {props.intro} </h2>
                </div>
                <div className="utils_msg"> {props.msg} </div>
            </div>
            <div className="utils_img_container">
                <div className="utils_image_container"><img src={props.img} alt="img" /></div>
            </div>
        </div>
    )
}

export default Utils