import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Clock } from "lucide-react"
import { RiProductHuntFill } from "react-icons/ri"

const bdt = (n) =>
  "৳ " + Number(n || 0).toLocaleString("en-BD", { maximumFractionDigits: 2 })

function ChangeBadge({ value }) {
  if (value === null || value === undefined) return null
  const up = value >= 0
  return (
    <div className={`flex items-center text-sm ${up ? "text-green-500" : "text-red-500"}`}>
      {up ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
      {up ? "+" : ""}{value}% from last month
    </div>
  )
}

export default function MarchantDashboardPage({ marchantuser, stats = {}, salesChart = [], recentActivities = [] }) {
  const chartData = salesChart.length ? salesChart : [{ name: "-", value: 0 }]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {marchantuser?.name ? `${marchantuser.name}'s` : "Merchant"} Dashboard
          </h2>
          <p className="text-muted-foreground">Overview of your products, orders, sales and revenue.</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bdt(stats.totalRevenue)}</div>
            <ChangeBadge value={stats.revenueChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <RiProductHuntFill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts ?? 0}</div>
            <p className="text-xs text-muted-foreground">Products in your store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders ?? 0}</div>
            <p className="text-xs text-muted-foreground">All-time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders ?? 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Sales performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v) => bdt(v)} />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.length ? (
                recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No recent orders
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
