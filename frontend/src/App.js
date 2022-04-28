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
import LoginSignUp from "./Component/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from "./Component/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <Route exact path="/login" component={LoginSignUp} />

      <Footer />
    </Router>
  );
}

export default App;
