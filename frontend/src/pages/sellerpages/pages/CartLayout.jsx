import "../../../styles/cartlayout.css";
import CartItems from "../../../components/seller/CartItems";
import { useCallback, useEffect, useState } from "react";
import { Axios_Node } from "../../../Axios";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import { toast } from "react-toastify";
import EmptyImage from "../../../images/empty-cart.png";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const CartLayout = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const updateData = useCallback(async (e) => {
    setData(e);
  }, []);
  const deleteItem = async (id, qty) => {
    try {
      const response = await Axios_Node.delete(`/cart/delete/${id}`, {
        params: {
          email: JSON.parse(localStorage.getItem("user")).email,
          qty,
        },
      });
      if (response.data.success === true) {
        toast.success("Product removed from cart successfully");
        setData(response.data.cart);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchData = async () => {
    try {
      const response = await Axios_Node.get("/cart/getcart", {
        params: {
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleCheckout = async () => {
    try {
      const response = await Axios_Node.post(
        "/payment/create-checkout-session",
        { coupon: appliedCoupon ? couponCode.toUpperCase() : "" },
        { params: { email: JSON.parse(localStorage.getItem("user")).email } }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {}
  };
  const applyCoupon = (coupon) => {
    if (!data || data.length <= 0) return toast.error("Cart is empty.");
    const listOfCoupons = ["SUMILSUTHAR197", "NIKE2024"];
    if (listOfCoupons.includes(coupon.toUpperCase())) {
      setCouponCode(coupon);
      setAppliedCoupon(true);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setLoading(false);
      return;
    }
    fetchData();
  }, []);
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <>
      <Navbar />
      <div className="cartMainContainer">
        <h1 className="cHeader">Shopping Cart</h1>
        <div className="cartContainer">
          <div className="cart-container-1">
            <table className="cart-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th className="cart-subheader">Quantity</th>
                  <th className="cart-subheader">Total Price</th>
                </tr>
              </thead>
              <tbody className="cart-table-tbody">
                {data &&
                  data.items.map((item) => {
                    return (
                      <CartItems
                        key={item._id}
                        cartId={item._id}
                        data={item.productId} // Assuming item.productId contains product details
                        quantity={item.quantity} // Correctly passing the quantity from the item
                        updateData={updateData} // Assuming updateData is a function you have
                        deleteItem={() => deleteItem(item._id, item.quantity)} // Correctly passing the item._id and item.quantity
                      />
                    );
                  })}
              </tbody>
            </table>
            {(!data || data.items.length <= 0) && (
              <div className="empty-cart">
                <img src={EmptyImage} alt="empty-cart" />
                <p>Looks like you haven't added any items to the cart yet.</p>
              </div>
            )}
          </div>
          <div className="cart-container-2">
            <div className="cartSummary">
              <h3 className="summaryHeader">Order Summary</h3>
              <div className="summaryInfo">
                <p>
                  <span>Sub Total</span>
                  <span>
                    RS.{" "}
                    {(data?.totalPrice - data?.totalPrice * 0.12 || 0).toFixed(
                      2
                    )}
                  </span>
                </p>
                <p>
                  <span>Tax</span>
                  <span>RS. {(data?.totalPrice * 0.12 || 0).toFixed(2)}</span>
                </p>
                <p>
                  <span>Shipping Charge</span>
                  <span>Free</span>
                </p>
                <p>
                  <span>Giftcard/Discount code</span>
                  {/* <span>- RS. 0</span> */}
                </p>
                <div className="couponInput">
                  <input
                    type="text"
                    name="couponCode"
                    id="couponCode"
                    value={couponCode}
                    disabled={appliedCoupon}
                    className={appliedCoupon ? "disabled" : ""}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                  />
                  <button
                    type="button"
                    disabled={appliedCoupon}
                    className={appliedCoupon ? "disabledBtn" : ""}
                    onClick={() => applyCoupon(couponCode)}
                  >
                    Apply
                  </button>
                </div>
                <p className="cart-total">
                  <span>Total</span>
                  <span>RS. {(data?.totalPrice || 0).toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={() => handleCheckout()}
                type="submit"
                className={
                  !data || data?.items.length <= 0
                    ? "checkout-btn disabled"
                    : "checkout-btn"
                }
                // className="checkout-btn"
                disabled={!data || data?.items.length <= 0}
              >
                checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartLayout;
