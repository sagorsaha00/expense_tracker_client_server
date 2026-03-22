import ShowExpense from "./showExpense";
import { NavBar } from "./navBar";
import HeroSection from "./heroSection";
import Footer from "./footer";
import HowWork from "./howWork";

export default function HomePage() {




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