import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <Link to={`/product/${item.product}`}>
        <img src={item.image} alt="ssa" />
      </Link>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
