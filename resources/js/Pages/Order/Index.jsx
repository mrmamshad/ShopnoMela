import { formatDate, formatCurrency } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/Components/ui/card";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function OrderList({ orders }) {
  const getStatusBadge = (status) => {
    const badgeVariants = {
      "Payment Pending": "warning",
      "Processing": "blue",
      "Shipped": "purple",
      "Delivered": "green",
      "Cancelled": "destructive",
    };
    return <Badge variant={badgeVariants[status] || "outline"}>{status}</Badge>;
  };

  const getActionButton = (status, orderId) => {
    switch (status) {
      case "Payment Pending":
        return <Button className="bg-orange-500 hover:bg-orange-600">Pay Now</Button>;
      case "Shipped":
        return <Button variant="outline">Track Order</Button>;
      case "Delivered":
        return <Button variant="outline">Write Review</Button>;
      default:
        return null;
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto sm:mx-20 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-start my-4 sm:my-6">🛍 Your Orders</h1>

        <div className="space-y-8  mb-10">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-md">
              <CardHeader className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap bg-gray-100 rounded-t-lg px-3 sm:px-4 py-2 sm:py-3 relative items-center">
                {/* Product Image & Details (Left) */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <img
                    src={order.image || "/images/placeholder.png"}
                    alt={order.product_name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{order.product_name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Color: {order.product_color} | Size: {order.product_size}
                    </p>
                  </div>
                </div>
                {/* Status Badge (Right, Moves Below on Mobile) */}
                <div className="absolute right-3 top-2 sm:static">{getStatusBadge(order.status)}</div>
              </CardHeader>

              <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center">
                  <div className="text-gray-700 text-sm sm:text-base">
                    Order ID: <span className="font-medium">{order.id}</span>
                    <span className="mx-1 sm:mx-2">•</span>
                    Placed on: <span className="font-medium">{formatDate(order.created_at)}</span> <br className="my-2" />
                    Address : <span className="font-medium">{order.address}</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-sm sm:text-base">{formatCurrency(order.price)}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Qty: {order.product_quantity}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap justify-between items-center px-3 sm:px-4 py-2 sm:py-3 border-t">
                <div className="text-sm sm:text-lg font-semibold">
                  Total: {formatCurrency(order.amount)}
                </div>
                <div className="mt-2 sm:mt-0">{getActionButton(order.status, order.id)}</div>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
