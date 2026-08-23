import DashboardLayout from "@/Layouts/marchant-layout"
import DashboardPage from "@/Components/marchant-dashboard-page"

export default function Marchant({ marchantuser, stats, salesChart, recentActivities }) {
  return (
    <DashboardLayout marchantuser={marchantuser}>
      <DashboardPage
        marchantuser={marchantuser}
        stats={stats}
        salesChart={salesChart}
        recentActivities={recentActivities}
      />
    </DashboardLayout>
  )
}
