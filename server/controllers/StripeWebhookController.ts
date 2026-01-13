import { Request, Response } from "express";
import stripe from "../configs/stripe.js";
import Stripe from "stripe";
import User from "../models/User.js";


const planCredits: Record<string, number> = {
    free: 3,
    basic: 50,
    pro: 200,
    enterprise: 500,
};

export const stripeWebhook = async (req: Request, res: Response) => {

    console.log("Webhook received");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body.toString());

    const sig = req.header("stripe-signature");

    if (!sig) {
        return res.status(400).send("Missing Stripe signature");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET_KEY!
        );
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan || "free";

        if(userId){
            const normalizedPlan = plan.toLowerCase();
            await User.findByIdAndUpdate(userId, {
                plan: normalizedPlan,
                credits: planCredits[normalizedPlan] || 3
            })
            console.log(`Updated user ${userId} to plan ${plan}`);

        }
    }

    res.json({ received: true });

}