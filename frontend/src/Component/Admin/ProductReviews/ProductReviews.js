import React, { Fragment, useEffect, useState } from "react";
import "./ProductReview.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReview,
  deleteReviews,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../Layout/MetaData";
import Sidebar from "../SideBar/Sidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
import Star from "@material-ui/icons/Star";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [productId, setProductId] = useState();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReview(productId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Delete Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, history, deleteError, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <DeleteIcon
                onClick={() =>
                  deleteReviewHandler(params.getValue(params.id, "id"))
                }
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        user: review.name,
        comment: review.comment,
        rating: review.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All REVIEWS</h1>
            <div>
              <Star />
              <input
                type="text"
                value={productId}
                required
                placeholder="Product Id"
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Review Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
