import "../../../styles/order.css";
import { useEffect, useState } from "react";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import EmptyImage from "../../../images/empty-cart.png";
import Axios from "../../../Axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const AdminOrders = () => {
  const [data, setData] = useState([]);
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
      const response = await Axios.get("/admin/order", {
        params: { limit, page, email: localStorage.getItem("email") },
      });
      console.log("Admin Orders", response.data);
      setData(response.data.orders);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status, paymentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.put("/admin/order", {
        id,
        status,
        paymentId,
        email: localStorage.getItem("email"),
      });
      console.log(response.data);
      if (response.data.success) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            item.delivered = status;
          }
          return item;
        });
        setData(updatedData);
        console.log("Data", data);
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
                  <td>{order.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.productDetails}</td>
                  <td>{order.delivered}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          order._id,
                          "Delivered",
                          order.paymentId
                        )
                      }
                    >
                      Mark as Delivered
                    </button>
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
