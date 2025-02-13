import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Search, ShoppingCart, CreditCard, Wallet, Truck, Calendar, Rocket } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mb-12  ">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-8">
          <p className="text-yellow-800">🎉 Collect payment voucher & get extra savings on your purchase!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Credit/Debit Card */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <CreditCard className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Credit/Debit Card</span>
                </CardContent>
              </Card>

              {/* Nagad */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Wallet className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Nagad</span>
                </CardContent>
              </Card>

              {/* bKash */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Wallet className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Save bKash Account</span>
                </CardContent>
              </Card>

              {/* Cash on Delivery */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Truck className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Cash on Delivery</span>
                </CardContent>
              </Card>

              {/* Installment */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Installment</span>
                </CardContent>
              </Card>

              {/* Rocket */}
              <Card className="cursor-pointer hover:border-[#f85606] transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Rocket className="h-8 w-8 mb-2 text-[#f85606]" />
                  <span className="text-sm">Rocket</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal(1 items and shipping fee included)</span>
                    <span>৳ 199</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-[#f85606] text-xl font-bold">৳ 199</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

