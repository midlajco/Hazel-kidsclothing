import { Link } from "react-router-dom"
import HomeNavbar from "./components/home/HomeNavbar"
import HeroBanner from "./components/home/HeroBanner"

function Home() {
  return (
    <main className="relative h-svh w-full">
      <HomeNavbar />
      <HeroBanner />
    </main>
  )
}

export default Home