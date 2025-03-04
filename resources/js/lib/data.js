// Mock data for orders
export function getOrders() {
  return [
    {
      id: "ORD-2025-0001",
      date: "2025-03-01T10:30:00",
      seller: "Bright Star",
      status: "Payment Pending",
      totalAmount: 75.0,
      items: [
        {
          name: "2 Male Plug to 1 Female Jack Audio Mic Headset Splitter Adapter Cable 3.5mm",
          variant: "Color Family: Black",
          price: 75.0,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2025-0002",
      date: "2025-02-25T14:15:00",
      seller: "Minister-FMCG-Choice.Selection",
      status: "Cancelled",
      totalAmount: 49.0,
      items: [
        {
          name: "Minister One Wash Synthetic Detergent Powder (Lemon & Jasmine) - 500gm",
          variant: "",
          price: 49.0,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2025-0003",
      date: "2025-02-20T09:45:00",
      seller: "Minister-FMCG-Choice.Selection",
      status: "Cancelled",
      totalAmount: 49.0,
      items: [
        {
          name: "Minister One Wash Synthetic Detergent Powder (Lemon & Jasmine) - 500gm",
          variant: "",
          price: 49.0,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2025-0004",
      date: "2025-02-15T16:20:00",
      seller: "TechGadgets",
      status: "Delivered",
      totalAmount: 129.99,
      items: [
        {
          name: "Wireless Bluetooth Earbuds with Charging Case",
          variant: "Color: White",
          price: 129.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2025-0005",
      date: "2025-02-10T11:30:00",
      seller: "FashionHub",
      status: "Shipped",
      totalAmount: 89.97,
      items: [
        {
          name: "Premium Cotton T-Shirt",
          variant: "Size: L, Color: Navy Blue",
          price: 29.99,
          quantity: 3,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2025-0006",
      date: "2025-02-05T13:45:00",
      seller: "HomeEssentials",
      status: "Processing",
      totalAmount: 249.5,
      items: [
        {
          name: "Stainless Steel Kitchen Knife Set",
          variant: "5-Piece Set",
          price: 199.5,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Bamboo Cutting Board",
          variant: "Size: Medium",
          price: 50.0,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ]
}

