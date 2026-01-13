import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate.tsx";
import MyGeneration from "./pages/MyGeneration.tsx";
import YtPreview from "./pages/YtPreview.tsx";
import Login from "./components/Login.tsx";
import {useEffect} from "react";
import { Toaster } from "react-hot-toast";
import PaymentPage from "./pages/PaymentPage.tsx";
import {Elements} from "@stripe/react-stripe-js";
import stripePromise from "./configs/stripe.ts";




export default function App() {

    const {pathname} = useLocation();



    useEffect(() => {
            window.scrollTo(0, 0);
    },[pathname])

    return (
        <>
            <Toaster/>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/generate/:id" element={<Generate />} />
                <Route path="/my-generation" element={<MyGeneration />} />
                <Route path="/preview" element={<YtPreview />} />
                <Route path="/login" element={<Login />} />

                <Route path="/payment" element={
                    <Elements stripe={stripePromise}>
                        <PaymentPage />
                    </Elements>
                }
                />
            </Routes>
            <Footer />
        </>
    );
}