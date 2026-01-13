import express from "express";
import {stripeWebhook} from "../controllers/StripeWebhookController.js";


const StripeWebhookRoute = express.Router()

StripeWebhookRoute.post("/", express.raw({type:"application/json"}), stripeWebhook);

export default StripeWebhookRoute;