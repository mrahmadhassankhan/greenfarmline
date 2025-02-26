const express = require("express");
const db = require("../backend/Database/DatabaseConnection");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { exec } = require("child_process");

const SECRET = "greenfarmlinepiplan1122!@#";

const app = express();

require("dotenv").config();
const uptimeRoutes = require("./Routers/uptimeRoutes");
const detectionRoutes = require("./Routers/detectionRoutes");
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
  origin: ["https://greenfarmline.shop", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors());

app.post("/webhook", express.raw({ type: "application/json" }), webhook);
<<<<<<< HEAD
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true }));
=======
app.post(
  "/github-webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const payload = req.body.toString();
    const sig = `sha256=${crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex")}`;

    console.log("📩 Webhook received:", payload);
    console.log("🔑 Signature received:", req.headers["x-hub-signature-256"]);
    console.log("🔑 Signature computed:", sig);

    if (req.headers["x-hub-signature-256"] !== sig) {
      console.log("⚠️ Invalid signature, ignoring request.");
      return res.status(401).send("Invalid signature.");
    }

    const data = JSON.parse(payload); // Convert string to JSON

    if (data.ref === "refs/heads/main") {
      console.log("✅ Push to main detected! Pulling changes...");
      exec(
        "cd /var/www/green-farm-line && git pull origin main && cd frontend && npm install && npm run build && cd .. && cd backend && npm install && npm run build && pm2 restart all",
        (err, stdout, stderr) => {
          if (err) {
            console.error(`❌ Error pulling from GitHub: ${stderr}`);
            return res.status(500).send("Git Pull Failed");
          }
          console.log(`✅ Git Pull Success:\n${stdout}`);
          res.status(200).send("Success");
        }
      );
    } else {
      console.log("🚀 Push detected, but not on main branch.");
      res.status(200).send("Not main branch, skipping pull.");
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
>>>>>>> 8427197d11a9a14ed9a4dc5240559233e2a21259
app.use(express.static(path.resolve(__dirname, "./public/Images/")));
app.use(express.static("public"));
app.use(cookieParser());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("GreenFarm Line");
});

app.use("/uptime", uptimeRoutes);
app.use("/detections", detectionRoutes);

app.use("/", queryRouter);

app.use("/answer", answerrouter);

app.use("/payment", paymentRoute);
app.use("/users", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);
app.use("/brands", brandRoute);
app.use("/category", categoryRoute);

app.get("*", (req, res) => {
  res.json("404 Not Found");
});

app.use(errorHandlerMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
