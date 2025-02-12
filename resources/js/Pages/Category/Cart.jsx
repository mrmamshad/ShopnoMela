"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Slim Fit Casual Shirt",
      description: "Button-Down Collar & Placket",
      price: 85,
      originalPrice: 92,
      image: "/placeholder.svg?height=120&width=120",
      quantity: 1,
      size: "XL",
      color: "Marron",
    },
    {
      id: 2,
      name: "Printed Straight Kurtas",
      description: "Digital Printed With Yoke Embroidered",
      price: 68,
      originalPrice: 75,
      image: "/placeholder.svg?height=120&width=120",
      quantity: 2,
      size: "XL",
      color: "Green",
    },
  ])
  const [coupon, setCoupon] = useState("")

  const updateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discount = subtotal * 0.15 // 15% discount
  const tax = 0 // Tax set to 0 as per image
  const shipping = "Free"
  const total = subtotal - discount + tax

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-6">Cart</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                1
              </span>
              <span className="ml-2 font-medium">Cart</span>
            </div>
            <div className="w-16 h-[2px] bg-gray-300" />
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm">
                2
              </span>
              <span className="ml-2 text-gray-400">Checkout</span>
            </div>
            <div className="w-16 h-[2px] bg-gray-300" />
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm">
                3
              </span>
              <span className="ml-2 text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2   space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border   rounded-lg p-6 shadow-sm hover:shadow-md">
                <div className="flex gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Size {item.size}</span>
                      <span className="mx-2">•</span>
                      <span>Color {item.color}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.price}</div>
                        <div className="text-sm text-gray-500 line-through">${item.originalPrice}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 border rounded-lg shadow-sm  ">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-orange-500">{shipping}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white rounded-lg py-3 mt-6 hover:bg-gray-800">
                Proceed to Checkout
              </button>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Estimated Delivery by 25 April, 2022</p>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Have a Coupon?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                  <button className="text-orange-500 font-medium">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage

