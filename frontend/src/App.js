import "./App.css";
import Header from "./Component/Layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home";
import Loader from "./Component/Layout/Loader/Loader";
import ProductDetails from "./Component/Product/ProductDetails";
import Products from "./Component/Product/Products.js";
import Search from "./Component/Product/Search.js";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Footer />
    </Router>
  );
}

export default App;
