const express = require("express");
const db = require("../backend/Database/DatabaseConnection");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/error");
const app = express();

require("dotenv").config();
const {
  errorHandler,
  notFound,
} = require("../backend/middlewares/errorMiddleware");

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
const PORT = process.env.PORT || 1783;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://greenfarmline.shop"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public/Images/")));
app.use(express.static("public"));
app.use(cookieParser());
// Register the uptime route
app.use("/api/v1/uptime", uptimeRoutes);
app.use("/api/v1/detections", detectionRoutes);

//Routers
//Query
app.use("/api/v1/", queryRouter);

//Answer
app.use("/api/v1/answer", answerrouter);

app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/category", categoryRoute);
//Error Handlers
app.use(notFound);
app.use(errorHandler);

// Catch-all for undefined routes
app.get("*", (req, res) => {
  res.json("404 Not Found");
});

app.get("/", (req, res) => {
  res.json("GreenFarm Line");
});

app.use(errorHandlerMiddleware);
// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
