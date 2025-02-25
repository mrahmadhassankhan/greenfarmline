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
  const [currentquantity, setCurrentquantity] = useState(quantity);
  const [debouncequantity, setDebouncequantity] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const firstUpdate = useRef(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (data?.slug) {
        try {
          const response = await Axios_Node.get(`/product/${data.slug}`);
          const fetchedDetails = response.data.data; // Access the actual product details

          console.log("Fetched Product Details:", fetchedDetails); // Log the correct product details

          // Update state with the correct product details
          setProductDetails((prevDetails) => {
            if (
              JSON.stringify(prevDetails) !== JSON.stringify(fetchedDetails)
            ) {
              console.log("Updating productDetails state");
              return fetchedDetails;
            }
            console.log("No changes detected in product details");
            return prevDetails;
          });
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchDetails();
  }, [data?.slug]);

  // Debounce mechanism for quantity updates
  useEffect(() => {
    const handler = setTimeout(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setDebouncequantity(currentquantity);
    }, 450);
    return () => clearTimeout(handler);
  }, [currentquantity]);

  // Update quantity in the backend
  const changequantity = async () => {
    try {
      const response = await Axios_Node.put(`/cart/update/${cartId}`, {
        quantity: debouncequantity,
        email: localStorage.getItem("email"),
      });
      updateData(response.data.cart);
      toast.success("Quantity updated successfully");
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
              <img
                src={`http:\\\\localhost:1783\\Images\\${productDetails?.document
                  .split("\\")
                  .pop()}`} // Use the document from productDetails
                alt="cart-img"
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
        <p>RS. {quantity * (productDetails?.price || 0)}</p>
      </td>
    </tr>
  );
};

export default memo(CartItems);
