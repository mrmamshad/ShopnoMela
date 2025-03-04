"use client"

import { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"

import OrderList from "@/Components/Orders/OrderList"
import FilterBar from "@/Components/Orders/FilterBar"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"


export default function Orders({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders || [])
  const [filteredOrders, setFilteredOrders] = useState(initialOrders || [])
  const [activeTab, setActiveTab] = useState("all")
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    dateRange: "all",
    sortBy: "date-desc",
  })

  useEffect(() => {
    // Apply filters and sorting
    let result = [...orders]

    // Filter by tab/status
    if (activeTab !== "all") {
      result = result.filter((order) => {
        if (activeTab === "to-pay") return order.status === "Payment Pending"
        if (activeTab === "to-ship") return order.status === "Processing"
        if (activeTab === "to-receive") return order.status === "Shipped"
        if (activeTab === "to-review") return order.status === "Delivered"
        return true
      })
    }

    // Apply additional filters
    if (filterOptions.status !== "all") {
      result = result.filter((order) => order.status === filterOptions.status)
    }

    // Apply date range filter
    if (filterOptions.dateRange !== "all") {
      const now = new Date()
      const pastDate = new Date()

      if (filterOptions.dateRange === "last-30-days") {
        pastDate.setDate(now.getDate() - 30)
      } else if (filterOptions.dateRange === "last-6-months") {
        pastDate.setMonth(now.getMonth() - 6)
      } else if (filterOptions.dateRange === "last-year") {
        pastDate.setFullYear(now.getFullYear() - 1)
      }

      result = result.filter((order) => {
        const orderDate = new Date(order.date)
        return orderDate >= pastDate && orderDate <= now
      })
    }

    // Apply sorting
    result.sort((a, b) => {
      if (filterOptions.sortBy === "date-desc") {
        return new Date(b.date) - new Date(a.date)
      } else if (filterOptions.sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date)
      } else if (filterOptions.sortBy === "amount-desc") {
        return b.totalAmount - a.totalAmount
      } else if (filterOptions.sortBy === "amount-asc") {
        return a.totalAmount - b.totalAmount
      }
      return 0
    })

    setFilteredOrders(result)
  }, [orders, activeTab, filterOptions])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleFilterChange = (newFilters) => {
    setFilterOptions({ ...filterOptions, ...newFilters })
  }

  return (
   
     <div>
       <Head title="My Orders" />
       <Header />
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => handleTabChange("all")}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === "all" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleTabChange("to-pay")}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === "to-pay" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                  >
                    To Pay
                  </button>
                  <button
                    onClick={() => handleTabChange("to-ship")}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === "to-ship" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                  >
                    To Ship
                  </button>
                  <button
                    onClick={() => handleTabChange("to-receive")}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === "to-receive" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                  >
                    To Receive
                  </button>
                  <button
                    onClick={() => handleTabChange("to-review")}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === "to-review" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
                  >
                    To Review
                  </button>
                </div>
              </div>

              <FilterBar onFilterChange={handleFilterChange} />

              <OrderList orders={filteredOrders} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
     </div>
  
  )
}

