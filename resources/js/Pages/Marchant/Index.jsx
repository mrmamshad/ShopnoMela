import DashboardLayout from "@/Layouts/marchant-layout"
import DashboardPage from "@/Components/marchant-dashboard-page"

export default function Marchant({marchantuser}) {
  return (
    <DashboardLayout  marchantuser={marchantuser}>
      <DashboardPage  marchantuser={marchantuser} />
    </DashboardLayout>
  )
}
