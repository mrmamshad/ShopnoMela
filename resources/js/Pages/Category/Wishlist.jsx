import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import { ShoppingCart, Trash2, Store } from "lucide-react"

const WishlistPage = () => {
  // Mock data - replace with actual API data
  const wishlistItems = [
    {
      id: 1,
      store: "TP-Link",
      isOfficialStore: true,
      products: [
        {
          id: 101,
          name: "TP-Link TL-WR820N (V2) 300 Mbps Multi-Mode Wi-Fi Router",
          price: 1205,
          image: "https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9zdGF0aWMtMDEuZGFyYXouY29tLmJkL3AvYzQ4ODM5NDQ2OTVhMjJiMDc0OWY3ZDUxMWJkN2UzNWEuanBn_80x80q90.png_.webp",
          colorFamily: "White",
          inStock: true,
        },
      ],
    },
    {
      id: 2,
      store: "Pick A Gadget",
      isOfficialStore: false,
      products: [
        {
          id: 201,
          name: "D116 Plus Smart watch Bracelets Fitness Tracker",
          price: 299,
          originalPrice: 1000,
          discountPercentage: 70,
          image: "https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9zdGF0aWMtMDEuZGFyYXouY29tLmJkL3AvNWQ1Y2IwNzIxY2FmYWI5ZTJlNGM5ODgxODg3YzJjYWUuanBn_80x80q90.png_.webp",
          colorFamily: "Random Color",
          inStock: true,
          priceDropped: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>
          <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            ADD ALL TO CART
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-6">
  {wishlistItems.map((store) => (
    <div key={store.id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* Store Header */}
      <div className="border-b p-5 flex items-center bg-gray-50">
        <Store className="w-6 h-6 mr-3 text-gray-600" />
        <span className="font-semibold text-gray-800">{store.store}</span>
        {store.isOfficialStore && (
          <span className="ml-3 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            Official Store
          </span>
        )}
      </div>

      {/* Store Products */}
      <div className="divide-y divide-gray-200">
        {store.products.map((product) => (
          <div key={product.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full md:w-48 h-48 object-cover rounded-xl border"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">Color Family: {product.colorFamily}</p>
                    {product.inStock ? (
                      <p className="text-sm text-green-600 mt-1">Back in stock</p>
                    ) : (
                      <p className="text-sm text-red-600 mt-1">Out of stock</p>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition" title="Remove from wishlist">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">৳ {product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm mt-1">
                        <span className="text-gray-500 line-through">৳ {product.originalPrice}</span>
                        <span className="text-orange-500 ml-2 font-medium">-{product.discountPercentage}%</span>
                      </div>
                    )}
                    {product.priceDropped && <div className="text-green-600 text-sm mt-1">Price dropped</div>}
                  </div>
                  <button className="w-full md:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center justify-center shadow-md transition">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


        {/* Empty State */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items that you like in your wishlist and buy them later</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default WishlistPage

