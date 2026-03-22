import React from "react";
import { Router, useNavigate } from "react-router-dom";
import { MessageCircle, BarChart2, Calendar, ArrowRight } from "lucide-react";
import ShowExpense from "./showExpense";
import { NavBar } from "./navBar";
import HeroSection from "./heroSection";
import Footer from "./footer";
import HowWork from "./howWork";

export default function HomePage() {

    const navigate = useNavigate();
    

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <NavBar />
            <HeroSection />
            <ShowExpense />
        


            <HowWork />

            <Footer />

        </div>
    );
}