import { motion } from "framer-motion"
import placeholderimage from "@/assets/placeholder.jpg"
import { Link } from "@inertiajs/react"

const products = [
  { id: 1, name: "Smartphone", price: 499.99, image: { placeholderimage } },
  { id: 2, name: "Laptop", price: 999.99, image: { placeholderimage }},
  { id: 3, name: "Headphones", price: 99.99, image: { placeholderimage } },
  { id: 4, name: "Smartwatch", price: 199.99, image: { placeholderimage } },
  { id: 5, name: "Camera", price: 599.99, image: { placeholderimage } },
  { id: 6, name: "Gaming Console", price: 399.99, image: { placeholderimage } },
]

function FeaturedProducts() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={route('product' )}>
            <img src={placeholderimage} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-[300ms]">
                Add to Cart
              </button>
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts

