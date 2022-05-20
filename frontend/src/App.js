import "./App.css";
// import Header from "./Component/Layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home";
// import Loader from "./Component/Layout/Loader/Loader";
import ProductDetails from "./Component/Product/ProductDetails";
import Products from "./Component/Product/Products";
import Search from "./Component/Product/Search";
import LoginSignUp from "./Component/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from "./Component/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from "./Component/User/ResetPassword";
import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Component/Cart/OrderSuccess";
import MyOrders from "./Component/Orders/MyOrders";
import OrderDetails from "./Component/Orders/OrderDetails";
import Dashboard from "./Component/Admin/Dashboard/Dashboard";
import ProductList from "./Component/Admin/ProductList/ProductList";
import NewProduct from "./Component/Admin/New Product/NewProduct";
import UpdateProduct from "./Component/Admin/UpdateProduct/UpdateProduct";
import OrderList from "./Component/Admin/Orders/OrderList";
import ProcessOrder from "./Component/Admin/ProcessOrder/ProcessOrder";
import UsersList from "./Component/Admin/UsersList/UsersList";
import UpdateUser from "./Component/Admin/UpdateUser/UpdateUser";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      {/* <Header /> */}

      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />

      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products"
        component={ProductList}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product"
        component={NewProduct}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product/:id"
        component={UpdateProduct}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/orders"
        component={OrderList}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/order/:id"
        component={ProcessOrder}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/users"
        component={UsersList}
      ></ProtectedRoute>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/user/:id"
        component={UpdateUser}
      ></ProtectedRoute>

      <Footer />
    </Router>
  );
}

export default App;
