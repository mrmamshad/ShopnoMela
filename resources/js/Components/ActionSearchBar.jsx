import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send } from "lucide-react";
import { router } from "@inertiajs/react";
import axios from "axios";
import useDebounce from "@/hooks/use-debounce";

function ActionSearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    axios
      .get(route("products.mobilesearch"), { params: { query: debouncedQuery } })
      .then((res) => {
        setSuggestions(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        setSuggestions([]);
      });
  }, [debouncedQuery]);

  const searchProduct = (searchQuery) => {
    setSuggestions([]);
    router.get(route("products.search"), { query: searchQuery }, { preserveState: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) searchProduct(query);
  };

  return (
    <div className="w-full max-w-xl mx-auto md:hidden">
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="w-full pt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="কোন পণ্য খুঁজছেন?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full pl-4 pr-10 py-2.5 h-10 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center"
            >
              {query.length > 0 ? (
                <Send className="w-4 h-4 text-green-600" />
              ) : (
                <Search className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </form>

        {/* Search Suggestions */}
        <div className="w-full">
          <AnimatePresence>
            {isFocused && suggestions.length > 0 && (
              <motion.div
                className="absolute z-30 w-full border rounded-xl shadow-lg overflow-hidden bg-white mt-1"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ul>
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition"
                      onMouseDown={() => searchProduct(product.title)}
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt=""
                          className="w-8 h-8 rounded object-cover"
                          loading="lazy"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ActionSearchBar;
