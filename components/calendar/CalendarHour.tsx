const CalendarHour = ({ date }: { date: Date }) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat('en-GB', options)

  return (
    <div className="border-t-2">
      <p className="">
        {formatter.format(date)}
      </p>
    </div>
  )
}

export default CalendarHour
