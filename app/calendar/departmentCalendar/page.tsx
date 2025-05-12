import CalendarDay from '@/components/calendar/CalendarDay'
import Layout from '@/components/Layout'

const DepartmentCalendar = () => {
  const date = new Date()
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const days = []
  for (let day = 1; day <= lastDay; day++)
    days.push(<CalendarDay key={day} date={new Date(date.getFullYear(), date.getMonth(), day)}></CalendarDay>)

  return (
    <Layout>
      <main className="grid-cols-1 sm:grid md:grid-cols-2">
        {days}
      </main>
    </Layout>
  )
}

export default DepartmentCalendar
