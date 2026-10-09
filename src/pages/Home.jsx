import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-light tracking-[0.3em]">HAZEL</h1>

      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-600">
        Premium essential For littleOnes
      </p>

      <Link
        to="/shop"
        className="mt-8 border border-black px-8 py-3 text-sm uppercase tracking-widest transition hover:bg-black hover:text-white"
      >
        Shop
      </Link>
    </div>
  )
}

export default Home