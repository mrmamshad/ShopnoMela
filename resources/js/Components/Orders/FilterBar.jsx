import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterBar({ onFilterChange }) {
  const handleStatusChange = (value) => {
    onFilterChange({ status: value })
  }

  const handleDateRangeChange = (value) => {
    onFilterChange({ dateRange: value })
  }

  const handleSortChange = (value) => {
    onFilterChange({ sortBy: value })
  }

  return (
    <div className="p-4 border-b flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Show:</span>
        <Select defaultValue="all" onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="Payment Pending">Payment Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Date:</span>
        <Select defaultValue="all" onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm font-medium">Sort By:</span>
        <Select defaultValue="date-desc" onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Newest First" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="amount-desc">Price: High to Low</SelectItem>
            <SelectItem value="amount-asc">Price: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

