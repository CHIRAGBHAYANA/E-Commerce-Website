import React from "react";
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download Our APP</h4>
        <p>Download App from for Android and IOS Mobile</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first Priority</p>
        <p>Copyrights 2022 &copy; Chirag Bhayana</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.linkedin.com/in/chirag-bhayana-b9230316b/">
          Linkedln
        </a>
        <a href="https://github.com/CHIRAGBHAYANA">Github</a>
        <a href="https://twitter.com/home?lang=en">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
