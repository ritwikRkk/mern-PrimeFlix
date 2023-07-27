import React, { } from 'react';
import "./rental.css";
// import "../../../styles/rental.css";
import { Link } from 'react-router-dom';

const Rental = () => {
  return (
    <div className="rental_hero">
            <div className="rental_img-container" style={{ "background": `url("./images/movie_collage_poster.jpg") center/cover` }}></div>
            <div className="rental_container">
                <div className="rental_msg"> <span className=""> Movie Rentals on PrimeFlix </span> </div>
                <div className="rental_info_msg">
                    <span> Early Acess to New Movies right to your fingertips </span>
                </div>
                <div className="rental_media_utils">
                    <div className="rental_subscription_container"> <Link className="rental_links subscription" to="/"> <span> Rent Now </span> </Link> </div>
                </div>
            </div>
        </div>
  )
}

export default Rental