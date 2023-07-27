import React, { } from 'react';
import "./channels.css";
// import "../../../styles/channels.css";
// import { Link } from 'react-router-dom';
import images from './ChannelsImg';

const Channels = () => {
    return (
        <div className="channels_container">
            <div className="channels_info">
                <div className="channels_intro">
                    <h2>Your Favourite Channels all at one place</h2>
                </div>
                <div className="channels_msg">
                    With PrimeFlix Video Channels, find TV shows and movies from your favorite channels all at one place. Enjoy with an add-on subscription to Channels of your choice
                </div>
            </div>
            <div className="channels_grid">
                <div className="channels_img_grid">
                    {images.map((img, i) => <div key={i} className="img_container"><img src={img} alt={`img${i}`} /></div>)}
                </div>

            </div>
        </div>
    )
}

export default Channels;