import React from 'react';
import "./scroller.css";
// import "../styles/scroller.css";

const Scroller = () => {

  const handleScroll = () => {
    window.scrollTo(0,0);
  };

  return (
    <div className="scroller_container" onClick={handleScroll} > <span> &uarr; </span> </div>
  )
}

export default Scroller;