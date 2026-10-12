import { Link } from "react-router-dom"
import HomeNavbar from "./components/home/HomeNavbar"
import HeroBanner from "./components/home/HeroBanner"
import NewArrivals from "./components/home/newArrival"
import CatagorySection from "./components/home/CatagorySection"

function Home() {
  return (
    <>
    <main className="relative h-svh w-full">
      <HomeNavbar />
      <HeroBanner />
    </main>
    <NewArrivals/>
    <CatagorySection/>
   </> 
  )
}

export default Home