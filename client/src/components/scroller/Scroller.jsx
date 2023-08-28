import React from 'react';
import "./scroller.css";
// import "../styles/scroller.css";

const Scroller = () => {

  const handleScroll = () => {
    window.scrollTo(0,0);
  };

  return (
    <div className="scroller_container" onClick={handleScroll} > <span> <span className="material-icons">north </span> </span> </div>
  )
}

export default Scroller;