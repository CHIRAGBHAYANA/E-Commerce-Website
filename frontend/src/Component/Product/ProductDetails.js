import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

function ProductDetails({ match }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  console.log(product);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarousalImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}> - </button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}> + </button>
                  </div>
                  <button onClick={addCartHandler}>Add To cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p> {product.description} </p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
