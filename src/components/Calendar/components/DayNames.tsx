export const DayNames = () =>{
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    return (
        <div className="row day-names">
            {
                dayNames.map(dayName => <span className="week-days" key={dayName}>{dayName}</span>)
            }
        </div>
    )
}
