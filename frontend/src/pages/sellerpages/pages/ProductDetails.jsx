import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../../styles/productDetails.css";
import { Axios_Node } from "../../../Axios";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import Star from "../../../components/seller/Star";
import RatingContainer from "../../../components/seller/RatingContainer";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios_Node.get(`/product/${slug}`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
        });
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = async () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      toast.error("Invalid quantity value", { position: "bottom-right" });
      return;
    }

    if (!localStorage.getItem("token")) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    try {
      const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail) {
        toast.error("User email not found", { position: "bottom-right" });
        return;
      }

      const response = await Axios_Node.post("/cart/add", {
        productId: data._id,
        quantity: parsedQuantity,
        email: userEmail,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "bottom-right",
      });
    }
  };

  if (loading) return <TriangleLoader height="500px" />;
  if (!data) return <p style={{ textAlign: "center" }}>Product not found</p>;

  const productImage = `https://api.greenfarmline.shop/Images/${data.document
    .split("/")
    .pop()}`;

  return (
    <>
      <Navbar />
      <section className="product-bg">
        <div className="prod-images-cont">
          <div className="prod-image">
            <img src={productImage} alt={data.name} />
          </div>
          <div className="pRow">
            <img src={productImage} alt={data.name} />
            <img src={productImage} alt={data.name} />
            <img src={productImage} alt={data.name} />
          </div>
        </div>
        <div className="prod-details-cont">
          <h1 className="ptitle">{`${
            data.brand
          } ${data.name.toLowerCase()}`}</h1>
          <h3 className="pprize">
            RS. {data.price} <span>3000</span>
          </h3>
          <div className="pStar">
            <Star
              rating={
                data.ratings.length > 0
                  ? data.ratingScore / data.ratings.length
                  : 0
              }
            />
          </div>

          <div className="quantity-selector">
            <label htmlFor="quantity" style={{ fontWeight: "bold" }}>
              Quantity:
            </label>
            <input
              style={{ marginLeft: "10px" }}
              type="number"
              id="quantity"
              min="1"
              max={data.quantity}
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                  setQuantity(newQuantity);
                }
              }}
            />
          </div>

          <button
            disabled={data.quantity === 0 || quantity <= 0}
            className="add-to-carts"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>

          {data.quantity === 0 && (
            <p className="outOfStock">
              Unfortunately, this product is currently out of stock.
            </p>
          )}

          <h3 className="pDescTitle" style={{ fontWeight: "bold" }}>
            Product Details
          </h3>
          <p>{data.description}</p>

          <h3 className="pDescTitle" style={{ fontWeight: "bold" }}>
            Category: {data.category}
          </h3>
          <h3 className="pDescTitle" style={{ fontWeight: "bold" }}>
            Brand: {data.brand}
          </h3>

          <h3 className="pDescTitle" style={{ fontWeight: "bold" }}>
            Features:
          </h3>
          <ul>
            {data.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h3 className="pDescTitle" style={{ fontWeight: "bold" }}>
            Note:
          </h3>
          <ul style={{ listStyleType: "disc", padding: "10px" }}>
            <li>100% Original Products</li>
            <li>Pay on delivery might be available</li>
            <li>Easy 30 days returns and exchanges</li>
            <li>Try & Buy might be available</li>
          </ul>

          <RatingContainer ratings={data.ratings} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
