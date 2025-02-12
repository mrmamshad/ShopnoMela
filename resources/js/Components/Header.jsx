import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"

function Header() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <header className="bg-green-500 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
     <Link href="/">  স্বপ্ন<span className="text-xl font-semibold"> Mela</span></Link>
        </motion.h1>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-full text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href={route('login')} className="hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href={route('register')} className="hover:underline">
                Sign Up
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

