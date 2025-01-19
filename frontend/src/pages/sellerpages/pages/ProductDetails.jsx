import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/productDetails.css";
import { useEffect, useState } from "react";
import Axios from "../../../Axios";
import { toast } from "react-toastify";
import TriangleLoader from "../../../components/seller/TriangleLoader";
import Star from "../../../components/seller/Star";
import RatingContainer from "../../../components/seller/RatingContainer";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/product/${slug}`);
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
        });
        navigate("/404");
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    // Ensure the quantity is a valid number and greater than 0
    const parsedQuantity = parseInt(quantity, 10);

    console.log("Parsed quantity:", parsedQuantity); // Log the parsed quantity

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      toast.error("Invalid quantity value", { position: "bottom-right" });
      return;
    }

    try {
      if (!localStorage.getItem("token")) {
        toast.error("Login required");
        navigate("/login");
        return;
      }

      // Send valid quantity
      const response = await Axios.post("/cart/add", {
        productId: data._id,
        quantity: parsedQuantity, // Use validated quantity
        email: localStorage.getItem("email"),
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "bottom-right" });
      console.log(error);
    }
  };

  if (loading) return <TriangleLoader height="500px" />;

  return (
    <>
      <Navbar />
      <section className="product-bg">
        <div className="prod-images-cont">
          <div className="prod-image">
            <img src={data.image} alt="img" />
          </div>
          <div className="pRow">
            <img src={data.image} alt="img" />
            <img src={data.image} alt="img" />
            <img src={data.image} alt="img" />
          </div>
        </div>
        <div className="prod-details-cont">
          <h1 className="ptitle">
            {data.brand + " " + data.name.toLowerCase()}
          </h1>
          <h3 className="pprize">
            ₹ {data.price} <span>3000 </span>
          </h3>
          <div className="pStar">
            <Star rating={data.ratingScore / data.ratings.length || 0} />
          </div>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={data.quantity}
              value={quantity}
              onChange={(e) => {
                // Ensure only valid numbers are entered
                const newQuantity = parseInt(e.target.value, 10);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                  setQuantity(newQuantity); // Set only valid numbers
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

          <h3 className="pDescTitle">Product Details</h3>
          <p>{data.description}</p>
          <h3 className="pDescTitle">
            Color:{" "}
            <p style={{ fontWeight: "normal", display: "inline" }}>
              {data.color}
            </p>
          </h3>
          <h3 className="pDescTitle">Material: </h3>
          <h3 className="pDescTitle">Features:</h3>
          <div style={{ marginLeft: "15px" }}>
            <ol>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Integer ut justo quis diam finibus lobortis vel at dui.</li>
              <li>
                Morbi ultricies leo sit amet nisl suscipit, et vulputate orci
                fringilla.
              </li>
              <li>
                Nullam sit amet lacus ut nibh pharetra rutrum venenatis ac
                purus.
              </li>
              <li>Sed ut arcu dapibus, viverra ex vitae, fermentum libero.</li>
              <li>Fusce eget mauris in elit ultricies vehicula.</li>
              <li>Vivamus tincidunt ligula id sollicitudin finibus.</li>
              <li>Nullam facilisis enim viverra nulla malesuada consequat.</li>
              <li>
                Nullam feugiat turpis ullamcorper augue fringilla, at facilisis
                magna dignissim.
              </li>
            </ol>
          </div>

          <h3 className="pDescTitle">Delivery Option</h3>
          <div>
            <div>
              <input
                type="number"
                name="pincode"
                max={999999}
                min={0}
                placeholder="Enter Pincode"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
              />
              <button className="pincode-check">check</button>
            </div>
            <h5>
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </h5>
            <ul type="none">
              <li>100% Original Products</li>
              <li>Pay on delivery might be available</li>
              <li>Easy 30 days returns and exchanges</li>
              <li>Try & Buy might be available</li>
            </ul>
          </div>

          <h3 className="pDescTitle">Offers</h3>
          <ul type="none">
            <li>Use &apos;SUMILSUTHAR197&apos; to avail flat 20% Off</li>
          </ul>
          <RatingContainer ratings={data.ratings} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
