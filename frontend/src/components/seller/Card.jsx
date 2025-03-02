import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Star from "./Star";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import SizeModal from "./SizeModal";

const Card = ({
  _id,
  slug,
  document,
  brand,
  name,
  ratingScore,
  ratings,
  price,
  sizeQuantity,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toTitleCase = (word) => {
    return word
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const auth = JSON.parse(localStorage.getItem("user")); // 🔹 Ensure auth is defined

  const handleAddToCart = (len) => {
    if (!auth) {
      toast.error("Login required");
      navigate("/login");
      return;
    } else if (len === 0) {
      toast.error("Out of stock");
      return;
    }
    setShowModal((prev) => !prev);
  };

  return (
    <div className="card-container">
      {showModal && (
        <SizeModal
          id={_id}
          size={sizeQuantity}
          onClose={() => setShowModal((prev) => !prev)}
        />
      )}
      <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
        <div className="image-div">
          <img
            src={`https://api.greenfarmline.shop/Images/${document.split("/").pop()}`}
            alt="Product Image"
            style={{
              objectFit: "cover",
              aspectRatio: "1",
              width: "100%",
              height: "100%",
              padding: "0",
            }}
            height="240px"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="desc">
        <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
          <h5>{brand}</h5>
          <h6>{toTitleCase(name)}</h6>
        </Link>
        <div className="star">
          <Star rating={ratings.length ? ratingScore / ratings.length : 0} />
        </div>
        <h4>RS. {price}</h4>
      </div>
      <button
        className="btn-cart"
        onClick={() => handleAddToCart(sizeQuantity.length)}
      >
        <span className="add-to-cart">
          <FaShoppingCart />
        </span>
      </button>
    </div>
  );
};

export default memo(Card);
