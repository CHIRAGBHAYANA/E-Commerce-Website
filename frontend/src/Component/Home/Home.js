import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Blue T shirt",
  price: "3000",
  _id: "chirg",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to ECOMMERCE</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
