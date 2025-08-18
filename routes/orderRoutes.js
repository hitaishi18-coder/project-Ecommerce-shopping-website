import express from "express";
import Order from "../model/order.js";

const router = express.Router();

// Order placement route
router.post("/", async (req, res) => {
  try {
    //  Frontend se jo order data aaya use new Order object me daal do
    const newOrder = new Order(req.body);

    //  Order ko MongoDB me save karo
    const savedOrder = await newOrder.save();

    //  Successfully save ho gaya toh response bhejo
    res.status(201).json(savedOrder);
  } catch (error) {
    //  Agar DB ya koi aur error aaya toh error bhejo
    res.status(500).json({ message: "Failed to place order" });
  }
});

export default router;
