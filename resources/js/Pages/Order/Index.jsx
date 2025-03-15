  import { useState } from "react";
  import { motion } from "framer-motion";
  import { formatDate, formatCurrency } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
  import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
  import Header from "@/Components/Header";
  import Footer from "@/Components/Footer";

  export default function OrderList({ orders }) {
    const [expandedOrder, setExpandedOrder] = useState(null);
    
    const getStatusBadge = (status) => {
      const badgeVariants = {
        "Payment Pending": "warning",
        "Processing": "yellow",
        "Confirmed": "blue",
        "Shipped": "purple",
        "Delivered": "green",
        "Cancelled": "destructive",
      };
      return <Badge variant={badgeVariants[status] || "outline"}>{status}</Badge>;
    };

    const statusSteps = ["Payment Pending", "Processing", "Confirmed", "Shipped", "Delivered"];

    const getOrderProgress = (status) => {
      return statusSteps.indexOf(status) + 1;
    };

    const toggleOrderTimeline = (orderId) => {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold my-4 sm:my-6">🛍 Your Orders</h1>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders found</div>
          ) : (
            <div className="space-y-8 mb-10">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-md">
                  <CardHeader className="flex  flex-row bg-gray-100 rounded-t-lg px-4 py-3 relative items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={order.image || "/images/placeholder.png"}
                        alt={order.product_name}
                        className="w-16 h-16 rounded-lg border object-contain"
                      />
                      <div>
                        <h3 className="font-medium text-base">{order.product_name}</h3>
                        <p className="text-sm text-gray-500">
                          Color: {order.product_color} | Size: {order.product_size}
                        </p>
                      </div>
                    </div>
                    <div className="absolute right-3 top-2 sm:static">{getStatusBadge(order.status)}</div>
                  </CardHeader>

                  <CardContent className="px-4 py-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="text-gray-700 text-base">
                        Order ID: <span className="font-medium">{order.id}</span>
                        <span className="mx-2">•</span>
                        Placed on: <span className="font-medium">{formatDate(order.created_at)}</span> <br />
                        Address: <span className="font-medium">{order.address}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-base">{formatCurrency(order.price)}</p>
                        <p className="text-sm text-gray-500">Qty: {order.product_quantity}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center px-4 py-3 border-t">
                    <div className="text-lg font-semibold">
                      Total: {formatCurrency(order.amount)}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => toggleOrderTimeline(order.id)}>
                      {expandedOrder === order.id ? "Hide Tracking" : "Track Order"}
                    </Button>
                  </CardFooter>

                  <Drawer  open={expandedOrder === order.id} onClose={() => setExpandedOrder(null)}>
                    <DrawerContent  className="bg-[#F7F2F2]" >
                      <div className="text-center flex  flex-col   items-center justify-center" >  
                        <DrawerHeader>
                        <DrawerTitle>Order Tracking</DrawerTitle>
                      </DrawerHeader>
                      <div className="p-6  space-y-4">
                        {statusSteps.map((step, index) => (
                          <div key={step} className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                index < getOrderProgress(order.status) ? "bg-green-500 border-green-500" : "border-gray-400"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                index < getOrderProgress(order.status) ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </Card>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }