import express from "express";
import stripe from "../configs/stripe.js";

export const stripeCheckout = async (req: express.Request, res: express.Response) => {
    try {
        const { priceId, plan } = req.body;
        const userId = req.session.userId;

        if(!priceId){
            return res.status(400).json({error: "Missing priceId in request body"})
        }

        if(!userId){
            return res.status(401).json({ error: "Not authenticated" });

        }

        if(!plan){
            return res.status(400).json({ error: "Missing plan type" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: "https://thumblify-jet.vercel.app/",
            cancel_url: "https://thumblify-jet.vercel.app/payment",
            metadata: {
                userId: String(userId),
                plan: plan
            },

        });

        res.status(200).json({ url: session.url });
    }catch (error: any) {
        console.error("Stripe checkout error:", error);
        res.status(500).json({ error: error.message });
    }
}