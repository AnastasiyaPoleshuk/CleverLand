import { Moment } from 'moment';

import { Day, IDay } from './Day';


export interface IWeekProps {
    month: Moment,
    selected: Moment | undefined,
    select: (day: IDay) => void,
    date: Moment,
}

export const Week = (props: IWeekProps) => {
    const days = [];
    let { date } = props;
    const { month, selected, select } = props;


    for (let i = 0; i < 7; i++) {
        const day = {
            name: date.format('dd').substring(0, 2),
            number: date.date(),
            isMonday: false,
            isToday: date.isSame(new Date(), 'day'),
            date
        };

        days.push(
            <Day
                key={day.number}
                day={day}
                selected={selected}
                select={select}
            />
        );

        date = date.clone();
        date.add(1, 'day');
    }

    return (
        <div className="row week">
            {days}
        </div>
    );
}
