import "../../../styles/order.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import EmptyImage from "../../../images/empty-cart.png";
import Axios from "../../../Axios";
import FormReviews from "../../../components/seller/FormReviews";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await Axios.get("/orders", {
        params: {
          email: localStorage.getItem("email"), // Ensure this matches the email in your database
        },
      });
      setData(response.data.orders); // Set orders data
      console.log(response.data.orders); // Debugging
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const openReviewModal = (status, id1, id2) => {
    if (status.toLowerCase() !== "delivered") {
      toast.error("You can only review delivered products.");
      return;
    }
    setShowModal(true);
    setCurrentProductId(id1);
    setCurrentOrderId(id2);
  };

  const submitReview = async (review, productId, orderId) => {
    try {
      console.log({
        rating: review.rating,
        review: review.opinion,
        productId,
        orderId,
      });
      const response = await Axios.put(
        "product/review",
        { rating: review.rating, review: review.opinion, productId, orderId },
        {
          params: {
            email: localStorage.getItem("email"), // Ensure the email is passed
          },
        }
      );
      if (response.data.success) {
        fetchData(); // Reload orders after review submission
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <TriangleLoader height="500px" />;

  return (
    <div className="orderMainContainer">
      <h1 className="cHeader">My Orders</h1>
      <div className="orderContainer" style={{ flexDirection: "column" }}>
        <table className="order-table">
          <thead>
            <tr>
              <th
                className="order-subheader order-th"
                style={{ textAlign: "left" }}
              >
                Product Details
              </th>
              <th className="order-subheader order-th">Order Date</th>
              <th className="order-subheader order-th">Status</th>
              <th className="order-subheader order-th">Total Price</th>
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="order-td">
                    {item.items.map((product, key) => (
                      <div key={product.id} className="order-td-div">
                        <div className="cart-product-cont">
                          <div className="cart-image-cont">
                            <img
                              src={product.image}
                              alt="product"
                              className="cart-image"
                            />
                          </div>
                          <div className="cart-product-details">
                            <p
                              className="cart-name-cont"
                              style={{
                                width: "13rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className="order-td">{item.createdAt}</td>
                  <td className="order-td">{item.delivered}</td>
                  <td className="order-td">PKR {item.totalPrice}</td>
                  <td className="order-td">
                    <div
                      className="order-btn-cont"
                      style={{ flexDirection: "column" }}
                    >
                      <button
                        className="cart-delete-btn"
                        disabled={item.delivered === "pending"}
                        style={
                          item.delivered == "pending"
                            ? { cursor: "not-allowed", opacity: "0.5" }
                            : {}
                        }
                        onClick={() =>
                          updateOrderStatus(
                            item._id,
                            "Delivered",
                            item.paymentId
                          )
                        }
                      >
                        Delivered
                      </button>
                      <button
                        className="cart-delete-btn"
                        disabled={item.delivered !== "pending"}
                        style={
                          item.delivered !== "pending"
                            ? { cursor: "not-allowed", opacity: "0.5" }
                            : {}
                        }
                        onClick={() =>
                          updateOrderStatus(
                            item._id,
                            "Cancelled",
                            item.paymentId
                          )
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <FormReviews
          onClose={() => setShowModal(false)}
          onSubmit={(review) =>
            submitReview(review, currentProductId, currentOrderId)
          }
        />
      )}
    </div>
  );
};

export default MyOrders;
