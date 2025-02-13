import { useState } from "react"
import { Home, Edit2, Package } from "lucide-react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import { Link } from "@inertiajs/react"


const CheckoutPage = () => {

  const [shippingInfo] = useState({
    name: "Mamshad",
    phone: "1781513106",
    address: "public hall, Madan Madan, Netrokona, Mymensingh",
    type: "HOME",
  })

  const [orderItems] = useState([
    {
      id: 1,
      name: "Minister One Wash Synthetic Detergent Powder (Lemon & Jasmine)",
      brand: "No Brand",
      price: 49,
      originalPrice: 70,
      discount: 30,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const deliveryFee = 150
  const itemsTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = itemsTotal + deliveryFee

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping & Billing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Shipping & Billing</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{shippingInfo.name}</p>
                    <p className="text-gray-600">{shippingInfo.phone}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {shippingInfo.type}
                  </span>
                </div>
                <p className="text-gray-600">{shippingInfo.address}</p>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Package 1 of 1</h2>
                <div className="text-sm text-gray-500">Fulfilled by Daraz</div>
              </div>

              {/* Delivery Option */}
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="font-medium">Standard Delivery</span>
                  </div>
                  <span className="text-gray-600">৳ {deliveryFee}</span>
                </div>
                <p className="text-sm text-gray-500">Get by 14-17 Feb</p>
              </div>

              {/* Order Items */}
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <img
                    src="https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9iZC1saXZlLTIxLnNsYXRpYy5uZXQva2YvU2UyZTNmY2I2YzUxMzRhNTZiNDNkMTFhYWViOTMzYjU2ci5qcGc=_2200x2200q90.png_.webp"
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Brand: {item.brand}</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">৳ {item.price}</span>
                      <span className="text-sm text-gray-500 line-through">৳ {item.originalPrice}</span>
                      <span className="text-green-500 text-sm">-{item.discount}%</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Promotion */}
              <div>
                <h3 className="font-medium mb-4">Promotion</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Store/Daraz Code"
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">APPLY</button>
                </div>
              </div>

              {/* Invoice and Contact Info */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Invoice and Contact Info</h3>
                  <button className="text-blue-500 hover:text-blue-600 text-sm">Edit</button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6" >
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items Total ({orderItems.length} Items)</span>
                    <span>৳ {itemsTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>৳ {deliveryFee}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span className="text-green-500">৳ {total}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">VAT included, where applicable</p>
                  </div>
                </div>
              </div>

              <Link  href={route('payments')}  className="w-full bg-green-500 text-white py-3  px-4  rounded-lg hover:bg-orange-600 transition-colors">
                Proceed to Pay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage

