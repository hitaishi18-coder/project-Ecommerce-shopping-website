import express from "express";
import Products from "../model/product.js";

const router = express.Router();

//  Saare products fetch karne ka route
router.get("/", async (req, res) => {
  try {
    //  MongoDB se saare products nikal lo
    const products = await Products.find();

    //  Products ko frontend pe JSON format me bhejo
    res.json(products);
  } catch (error) {
    //  Agar DB query me problem aayi toh error bhejo
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
