import React from 'react';
import "./footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="logo_container"> <Link to="/" className="links-style" id="footer__logo">PrimeFlix</Link> </div>
        <div className="footer_items">
          <Link to="/about-us" className="links-style" id=""> About Us </Link>
          <Link to="/contact-us" className="links-style" id=""> Contact Us </Link>
          <Link to="/terms" className="links-style" id=""> Terms & Conditions </Link>
          <Link to="/privacy" className="links-style" id=""> Privacy Policy </Link>
        </div>
        <div className="site_info"> &copy; PrimeFlix.com, (2020 - {new Date().getFullYear()}), Inc. or its affiliates </div>
      </div>
    </footer>
  )
}

export default Footer