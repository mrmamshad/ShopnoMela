import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function OrderItem({ order }) {
  const { route } = usePage().props;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Payment Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButton = (status, orderId) => {
    switch (status) {
      case "Payment Pending":
        return (
          <Link href={route("orders.pay", { order: orderId })}>
            <Button className="bg-orange-500 hover:bg-orange-600">Pay Now</Button>
          </Link>
        );
      case "Shipped":
        return (
          <Link href={route("orders.track", { order: orderId })}>
            <Button variant="outline">Track Order</Button>
          </Link>
        );
      case "Delivered":
        return (
          <Link href={route("reviews.create", { order: orderId })}>
            <Button variant="outline">Write Review</Button>
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{order.seller}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs px-3 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
          {getActionButton(order.status, order.id)}
        </div>
      </div>

      {order.products.map((product, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 py-3">
          <div className="flex-shrink-0">
            <img
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              width={80}
              height={80}
              className="border rounded object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.variant}</p>
          </div>
          <div className="text-right sm:min-w-[120px]">
            <div className="font-medium">{formatCurrency(product.price)}</div>
            <div className="text-sm text-gray-500">Qty: {product.quantity}</div>
          </div>
        </div>
      ))}

      <div className="mt-3 pt-3 border-t text-sm flex justify-between">
        <div>
          Order ID: <span className="font-medium">{order.id}</span>
          <span className="mx-2">•</span>
          Placed on: <span className="font-medium">{formatDate(order.date)}</span>
        </div>
        <div className="font-medium">Total: {formatCurrency(order.totalAmount)}</div>
      </div>
    </div>
  );
}
