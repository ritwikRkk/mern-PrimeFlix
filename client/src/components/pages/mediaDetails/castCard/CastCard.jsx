import React from 'react';
import { Link } from 'react-router-dom';
import "./castCard.css";
import tmdbURL from '../../../../api/urlConfigs/tmdbURL';
// import "../../../styles/castCard.css";

const CastCard = (props) => {
  return (
    <>
      <div className="cast_card_container">
        <Link className="link" to={`/cast/${props.id}`}>
          <div className="cast_card">
            <img src={tmdbURL.posterPath(props.img)} alt="" />
            <div className="cast_name"> {props.name} </div>
          </div>
        </Link>
      </div>

    </>
  )
}

export default CastCard