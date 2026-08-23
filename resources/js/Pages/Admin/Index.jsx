import DashboardLayout from "@/Layouts/admin-dashboard-layout"
import DashboardPage from "@/Components/admin-dashboard-page"

export default function AdminDashboard({ stats, salesChart, recentActivities }) {
  return (
    <DashboardLayout>
      <DashboardPage
        stats={stats}
        salesChart={salesChart}
        recentActivities={recentActivities}
      />
    </DashboardLayout>
  )
}
