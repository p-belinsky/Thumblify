import express from "express";
import protect from "../middlewares/auth.js";
import {stripeCheckout} from "../controllers/PaymentController.js";


const PaymentRouter = express.Router();

PaymentRouter.post('/checkout', protect, stripeCheckout)


export default PaymentRouter;