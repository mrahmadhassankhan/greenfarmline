import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Axios_Node } from "../../Axios";
import "../../styles/cartlayout.css";

const CartItems = ({
  cartId,
  data,
  quantity,
  size,
  deleteItem,
  updateData,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [debounceQuantity, setDebounceQuantity] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const firstUpdate = useRef(true);
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "";

  useEffect(() => {
    const fetchDetails = async () => {
      if (data?.slug) {
        try {
          const response = await Axios_Node.get(`/product/${data.slug}`);
          const fetchedDetails = response.data.data;

          setProductDetails((prevDetails) =>
            JSON.stringify(prevDetails) !== JSON.stringify(fetchedDetails)
              ? fetchedDetails
              : prevDetails
          );
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchDetails();
  }, [data?.slug]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setDebounceQuantity(currentQuantity);
    }, 450);

    return () => clearTimeout(handler);
  }, [currentQuantity]);

  useEffect(() => {
    const changeQuantity = async () => {
      try {
        if (!userEmail) {
          toast.error("User not logged in");
          return;
        }

        const response = await Axios_Node.put(`/cart/update/${cartId}`, {
          quantity: debounceQuantity,
          email: userEmail,
        });

        updateData(response.data.cart);
        toast.success("Quantity updated successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    if (debounceQuantity !== null) {
      changeQuantity();
    }
  }, [debounceQuantity, cartId, updateData, userEmail]);

  return (
    <tr>
      <td>
        <div className="cart-product-cont">
          <div className="cart-image-cont">
            <Link
              to={`/product/${data.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={`https://api.greenfarmline.shop/Images/$
              {productDetails.document.split("/").pop()}`}
                alt=""
              />
            </Link>
          </div>

          <div className="cart-name-cont">
            <p style={{ textAlign: "left" }}>
              {productDetails?.brand} {productDetails?.name}
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
          <p>Price: RS. {productDetails?.price}/item</p>
        </div>
      </td>

      <td className="td-quantity cart-subheader">
        <div>
          <button
            onClick={() =>
              setCurrentQuantity((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            <HiMinusCircle />
          </button>
          <p>{currentQuantity}</p>
          <button onClick={() => setCurrentQuantity((prev) => prev + 1)}>
            <HiPlusCircle />
          </button>
        </div>
      </td>
      <td className="cart-subheader">
        <p>RS. {quantity * (productDetails?.price || 0)}</p>
      </td>
    </tr>
  );
};

export default memo(CartItems);
