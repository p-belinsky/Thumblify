import express from "express";
import {stripeWebhook} from "../controllers/StripeWebhookController.js";


const StripeWebhookRoute = express.Router()

StripeWebhookRoute.post("/", stripeWebhook);

export default StripeWebhookRoute;