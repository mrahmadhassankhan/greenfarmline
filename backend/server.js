const express = require("express");
const db = require("../backend/Database/DatabaseConnection");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/error");
const app = express();

require("dotenv").config();
const uptimeRoutes = require("./Routers/uptimeRoutes"); // Import the uptime route
const detectionRoutes = require("./Routers/detectionRoutes"); // Image detection result save to db route
const queryRouter = require("./Routers/QueryRouter");
const answerrouter = require("./Routers/AnswerRouter");

const userRoute = require("./Routers/user");
const productRoute = require("./Routers/product");
const cartRoute = require("./Routers/cart");
const paymentRoute = require("./Routers/payments");
const adminRoute = require("./Routers/admin");
const brandRoute = require("./Routers/brands");
const categoryRoute = require("./Routers/category");
const { webhook } = require("./Controllers/payments");
const PORT = 1783;

const corsOptions = {
  origin: "https://greenfarmline.shop", // Add your allowed domains
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
 allowedHeaders: ["Content-Type", "Authorization"],
 credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true }));
app.use(express.static(path.resolve(__dirname, "./public/Images/")));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("GreenFarm Line");
});

// Register the uptime route
app.use("/uptime", uptimeRoutes);
app.use("/detections", detectionRoutes);

//Routers
//Query
app.use("/", queryRouter);

//Answer
app.use("/answer", answerrouter);

app.use("/payment", paymentRoute);
app.use("/users", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);
app.use("/brands", brandRoute);
app.use("/category", categoryRoute);

// Catch-all for undefined routes
app.get("*", (req, res) => {
  res.json("404 Not Found");
});


app.use(errorHandlerMiddleware);
// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
