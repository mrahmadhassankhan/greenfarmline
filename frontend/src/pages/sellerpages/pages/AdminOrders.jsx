import "../../../styles/order.css";
import "../../../styles/cartlayout.css";
import { useEffect, useState } from "react";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import EmptyImage from "../../../images/empty-cart.png";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const AdminOrders = () => {
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;
  const gotoPage = (p) => {
    setPage(p);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios_Node.get("/admin/order", {
        params: { limit, page },
      });
      setData(response.data.orders);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProductImages = async () => {
    if (data.length > 0) {
      try {
        const promises = data.flatMap((order) =>
          order.items.map(async (item) => {
            const response = await Axios_Node.get(`/product/${item.slug}`);
            return {
              slug: item.slug,
              image: response.data.document.split("/").pop(), // Assuming 'document' contains the image path
            };
          })
        );

        const fetchedDetails = await Promise.all(promises);
        const detailsMap = Object.fromEntries(
          fetchedDetails.map((detail) => [detail.slug, detail.image])
        );

        setProductDetails(detailsMap);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchProductImages();
  }, [data]);

  const updateOrderStatus = async (id, status, paymentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios_Node.put("/admin/order", {
        id,
        status,
        paymentId,
        email: JSON.parse(localStorage.getItem("user")).email,
      });

      if (response.data.success) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            item.delivered = status;
          }
          return item;
        });
        setData(updatedData);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) return <TriangleLoader height="500px" />;

  return (
    <div className="orderMainContainer">
      <h1 className="cHeader" style={{ textAlign: "left" }}>
        Orders List
      </h1>
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
              <th className="order-subheader order-th ">Customer</th>
              <th className="order-subheader order-th ">Order Date</th>
              <th className="order-subheader order-th ">Status</th>
              <th className="order-subheader order-th ">Total Price</th>
              <th className="order-subheader order-th ">Action</th>
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            {data && data.length > 0 ? (
              data.map((order) => (
                <tr key={order._id}>
                  <td className="order-td">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-td-div">
                        <div className="cart-product-cont">
                          <div className="cart-image-cont">
                            <img
                              src={`https://api.greenfarmline.shop/Images/${
                                productDetails[item.slug]
                              }
                              `}
                              alt={item.product.name}
                              className="cart-image"
                            />
                          </div>
                          <div className="cart-product-details ml-2 text-left">
                            <strong>{item.product.name}</strong> (
                            {item.product.brand})
                            <br />
                            <span style={{ fontSize: "12px", color: "gray" }}>
                              Slug: {item.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="order-td">{order.name}</td>
                  <td className="order-td">{order.createdAt}</td>
                  <td className="order-td">{order.delivered}</td>
                  <td className="order-td">RS.{order.totalPrice}</td>
                  <td className="order-td">
                    <div
                      className="order-btn-cont"
                      style={{ flexDirection: "column" }}
                    >
                      <button
                        className="cart-delete-btn"
                        disabled={order.delivered !== "pending"}
                        style={
                          order.delivered !== "pending"
                            ? { cursor: "not-allowed", opacity: "0.5" }
                            : {}
                        }
                        onClick={() =>
                          updateOrderStatus(
                            order._id,
                            "Delivered",
                            order.paymentId
                          )
                        }
                      >
                        Delivered
                      </button>
                      <button
                        className="cart-delete-btn"
                        disabled={order.delivered !== "pending"}
                        style={
                          order.delivered !== "pending"
                            ? { cursor: "not-allowed", opacity: "0.5" }
                            : {}
                        }
                        onClick={() =>
                          updateOrderStatus(
                            order._id,
                            "Cancelled",
                            order.paymentId
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
        {(!data || data.length <= 0) && (
          <div className="empty-cart">
            <img src={EmptyImage} alt="empty-cart" />
            <p>No orders have been placed yet.</p>
          </div>
        )}
      </div>
      <Pagination
        totalPageCount={totalPages}
        previousPage={() => setPage(page - 1)}
        canPreviousPage={canPreviousPage}
        nextPage={() => setPage(page + 1)}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        pageIndex={page - 1}
      />
    </div>
  );
};

export default AdminOrders;
