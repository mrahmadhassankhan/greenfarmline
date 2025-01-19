import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";

const CartItems = ({
  cartId,
  data,
  quantity,
  size,
  deleteItem,
  updateData,
}) => {
  const [currentquantity, setCurrentquantity] = useState(quantity);
  const [debouncequantity, setDebouncequantity] = useState(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("debounce");
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setDebouncequantity(currentquantity);
    }, 450);
    return () => {
      clearTimeout(handler);
    };
  }, [currentquantity]);
  const changequantity = async () => {
    try {
      const response = await Axios.put(`/cart/update/${cartId}`, {
        quantity: debouncequantity,
        email: localStorage.getItem("email"),
      });
      console.log(response.data);
      updateData(response.data.cart);
      // if (response.data.success === true) {
      toast.success("Quantity updated successfully");

      // }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (debouncequantity !== null) {
      changequantity();
    }
  }, [debouncequantity]);
  return (
    <tr>
      <td>
        <div className="cart-product-cont">
          <div className="cart-image-cont">
            <Link
              to={`/product/${data.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img src={data.image} alt="cart-img" />
            </Link>
          </div>
          <div className="cart-name-cont">
            <p style={{ textAlign: "left" }}>
              {data.brand} {data.name}
            </p>
            <div className="cart-name-cont-btn">
              <button onClick={deleteItem}>
                <AiFillDelete /> delete item
              </button>
              <button>
                <AiFillHeart /> move to favorite
              </button>
            </div>
          </div>
        </div>
        <div className="cart-mobile-info">
          <p>Quantity: {size}</p>
          <p>Price: ₹ {data.price}/item</p>
        </div>
      </td>

      <td className="td-quantity cart-subheader">
        <div>
          <button
            onClick={() =>
              setCurrentquantity((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            <HiMinusCircle />
          </button>
          <p>{currentquantity}</p>
          <button onClick={() => setCurrentquantity((prev) => prev + 1)}>
            <HiPlusCircle />
          </button>
        </div>
      </td>
      <td className="cart-subheader">
        <p>₹ {quantity * data.price}</p>
      </td>
    </tr>
  );
};

export default memo(CartItems);
