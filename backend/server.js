const express = require("express");
const db = require("../backend/Database/DatabaseConnection"); // Connection Handling MongoDB
const app = express();

require("dotenv").config();
const cors = require("cors");
const {
  errorHandler,
  notFound,
} = require("../backend/middlewares/errorMiddleware");

const categoriesrouter = require("./Routers/CategoriesRouter");
const contactUsRouter = require("./Routers/ContactUsRouter");
const orderRouter = require("./Routers/OrderRouter");
const productrouter = require("./Routers/ProductsRouter");
const registerRouter = require("./Routers/RegisterationRouter");
const loginRouter = require("./Routers/LoginRouter");
const queryRouter = require("./Routers/QueryRouter");
const answerrouter = require("./Routers/AnswerRouter");
const PORT = process.env.PORT || 1783;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:6464"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

//Routers

//Register
app.use("/api/register", registerRouter);

//Login
app.use("/api/login", loginRouter);

//Query
app.use("/api/query", queryRouter);

//Answer
app.use("/api/answer", answerrouter);

//Error Handlers
app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
