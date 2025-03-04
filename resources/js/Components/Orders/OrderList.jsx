import OrderItem from "@/Components/Orders/OrderItem"

export default function OrderList({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No orders found</p>
      </div>
    )
  }

  return (
    <div className="divide-y">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  )
}

