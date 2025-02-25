import "../../../styles/order.css";
import "../../../styles/cartlayout.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import EmptyImage from "../../../images/empty-cart.png";
import { Axios_Node } from "../../../Axios";
import FormReviews from "../../../components/seller/FormReviews";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await Axios_Node.get("/orders", {
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

  useEffect(() => {
    const fetchDetails = async () => {
      if (data?.length > 0) {
        try {
          // Create an array of promises for fetching details of all products
          const promises = data.flatMap((order) =>
            order.items.map(async (product) => {
              const response = await Axios_Node.get(`/product/${product.slug}`);
              // console.log(`Response for slug ${product.slug}:`, response.data);
              return {
                slug: product.slug,
                document: response.data.data.document,
              }; // Map slug to document only
            })
          );

          // Wait for all promises to resolve
          const fetchedDetails = await Promise.all(promises);

          // Create a map for easy lookup by slug
          const detailsMap = Object.fromEntries(
            fetchedDetails.map((detail) => [detail.slug, detail.document])
          );

          // Update productDetails state
          setProductDetails(detailsMap);

          console.log("Fetched Product Details Map:", detailsMap);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchDetails();
  }, [data]);

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
            {data !== null &&
              data.map((order, orderIndex) => (
                <tr key={orderIndex}>
                  <td className="order-td">
                    {order.items.map((product, productIndex) => (
                      <div key={product.id} className="order-td-div">
                        <div className="cart-product-cont">
                          <div className="cart-image-cont">
                            <img
                              src={`https://greenfarmline.shop/Images/${productDetails?.[
                                product.slug
                              ]
                                ?.split("\\")
                                .pop()}`}
                              alt={product.name}
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
                        <div className="order-btn-cont">
                          <button
                            className="cart-delete-btn"
                            disabled={product.isReviewed}
                            style={
                              product.isReviewed
                                ? { cursor: "not-allowed", opacity: "0.5" }
                                : {}
                            }
                            onClick={() => {
                              openReviewModal(
                                order.delivered,
                                product.id,
                                order.id
                              );
                              // console.log(order.delivered +","+ product.id +","+ order.id)
                            }}
                          >
                            {product.isReviewed ? "Reviewed" : "Review"}
                          </button>
                          <button
                            className="cart-delete-btn"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="order-td">{order.createdAt}</td>
                  <td className="order-td">{order.delivered}</td>
                  <td className="order-td">PKR {order.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {(!data || data.length <= 0) && (
          <div className="empty-cart">
            <img src={EmptyImage} alt="empty-cart" />
            <p>Looks like you haven't purchased any items yet.</p>
          </div>
        )}
      </div>

      {showModal && (
        <>
          <FormReviews
            onClose={() => setShowModal(false)}
            onSubmit={(review) =>
              submitReview(review, currentProductId, currentOrderId)
            }
          />
        </>
      )}
    </div>
  );
};

export default MyOrders;
