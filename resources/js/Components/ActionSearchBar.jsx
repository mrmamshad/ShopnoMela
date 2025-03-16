"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Send } from "lucide-react"
import { router } from "@inertiajs/react"
import axios from "axios"
import useDebounce from "@/hooks/use-debounce"

function ActionSearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 300) // Prevents too many requests

  // Fetch products based on search query
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([])
      return
    }

    axios
      .get(route("products.mobilesearch"), { params: { query: debouncedQuery } })
      .then((res) => {
        setSuggestions(res.data) // Set product suggestions
      })
      .catch(() => {
        setSuggestions([])
      })
  }, [debouncedQuery])

  // Trigger search with Inertia
  const searchProduct = (searchQuery) => {
    setSuggestions([]) // Hide suggestions
    router.get(route("products.search"), { query: searchQuery }, { preserveState: true })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    searchProduct(query)
  }

  return (
    <div className="w-full max-w-xl mx-auto md:hidden">
      <div className="relative flex flex-col justify-start items-center">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-sm sticky top-0 z-10 pt-4 pb-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block" htmlFor="search">
            Search Products
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="কোন পণ্য খুঁজছেন?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              {query.length > 0 ? <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" /> : <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />}
            </button>
          </div>
        </form>

        {/* Search Suggestions */}
        <div className="w-full max-w-sm">
          <AnimatePresence>
            {isFocused && suggestions.length > 0 && (
              <motion.div
                className="w-full border rounded-md shadow-sm overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.ul>
                  {suggestions.map((product) => (
                    <motion.li
                      key={product.id}
                      className="px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer rounded-md"
                      onClick={() => searchProduct(product.title)} // Auto-search on click
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.title}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ActionSearchBar
