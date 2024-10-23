import CalendarHour from './CalendarHour'

const CalendarDay = ({ date }: { date: Date }) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('en-GB', options)

  const hours = []
  for (let hour = 0; hour <= 23; hour++)
    hours.push(<CalendarHour
      key={hour}
      date={new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour)}
    ></CalendarHour>)


  return (
    <div
      className="m-2 p-2 flex flex-col self-start rounded-md shadow bg-white">
      <h5 className="mb-2 text-xl font-medium">{formatter.format(date)}</h5>
      {hours}
    </div>
  )
}

export default CalendarDay
