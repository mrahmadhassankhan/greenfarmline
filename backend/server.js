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
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public/Images/")));
app.use(express.static("public"));
app.use(cookieParser());

//Routers
//Query
app.use("/api/query", queryRouter);

//Answer
app.use("/api/answer", answerrouter);

app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1", userRoute);
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

app.use(errorHandlerMiddleware);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
