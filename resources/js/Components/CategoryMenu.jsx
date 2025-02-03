import { motion } from "framer-motion"

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports & Outdoors",
  "Automotive",
  "Groceries",
  "Toys & Games",
  "Books & Stationery",
]

function CategoryMenu() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-orange-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {category}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CategoryMenu

