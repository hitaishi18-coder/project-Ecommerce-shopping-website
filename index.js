import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import path from "path";
import session from "express-session";

import productRoutes from "./routes/productroutes.js";
import orderRoute from "./routes/orderRoutes.js";
import authroute from "./routes/authroute.js";
import contactRoute from "./routes/contactroute.js";
import fashionassistant from "./routes/assistantRoute.js";

import { fileURLToPath } from "url";

//  Fix for __dirname in ES modules (kyunki by default ES modules me __dirname nahi hota)

// file ka pura path nikalna (url ko normal path me convert karke)
const __filename = fileURLToPath(import.meta.url);
// us file ka sirf folder/directory nikalna
const __dirname = path.dirname(__filename);

//  Environment variables load karne ke liye
dotenv.config();

//  MongoDB database connect karna
connectdb();

const app = express();

//  Middleware
app.use(express.json()); // JSON data ko parse karega
app.use(express.urlencoded({ extended: true })); // URL encoded data ko parse karega .... form k liye 

//  Session setup (login/logout ke liye)
app.use(
  session({
    secret: "mysecretkey", // session ko encrypt karne ke liye key
    resave: false, // har request pe session save mat karo
    saveUninitialized: false, // jab tak session me data na ho, tab tak save mat karo
  })
);

//  Middleware to protect routes
const requireLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next(); // agar login hai toh aage jao
  }
  res.redirect("/"); // warna landing page pe bhej do
};

//  Static files serve karna (images, css, js, html)
app.use(
  express.static(path.join(__dirname, "public"), {
    index: false, // default index.html auto serve na ho
  })
);

//  Public landing route (sabko dikhega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

//  Protected route (sirf login hone ke baad index.html dikhega)
app.get("/index.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//  API Routes
app.use("/api/products", productRoutes); // products ke liye
app.use("/api/orders", orderRoute); // orders ke liye
app.use("/api/auth", authroute); // signup/signin ke liye
app.use("/api/contact", contactRoute); // contact form ke liye
app.use("/fashion/ai", fashionassistant); // AI fashion assistant ke liye

//  Server start karna
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("✅ Server started at port " + PORT));
