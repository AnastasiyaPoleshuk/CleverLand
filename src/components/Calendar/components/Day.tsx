import moment, { Moment } from 'moment';
import { useState } from 'react';

export interface IDay {
    date: Moment,
    isMonday: boolean,
    isToday: boolean,
    name: string,
    number: number,
}

export interface IDayProps {
    // day: number,
    day: IDay,
    select: (day: IDay) => void,
    selected: Moment | undefined,
}


export const Day = (props: IDayProps) => {
    const { day, select, selected } = props;
    const [isClick, setIsClick] = useState(false);
    const weekday = day.name === 'Sa' || day.name === 'Su' ? 'weekend' : '';

    const getActiveDays = () => {
        // let active = '';
        const tomorrow = day.date.clone();
        // console.log(tomorrow.day());


        if (
            tomorrow.subtract(1, 'd').date() === moment().date() &&
            day.date.day() !== 6 &&
            day.date.day() !== 0
        ) {

            return 'active';
        }

        return '';
    }

    const isFriday = () => {

        if (
            day.name === 'Mo' &&
            moment().day() === 5 &&
            day.date.dayOfYear() === moment().dayOfYear() + 3
        ) {
            day.isMonday = true;

            return true;
        }

        return false;
    }

    const checkClick = () => {
        isClick ? null : setIsClick(true);
        select(day)
    }

    return (
        <span
            key={day.date.toString()}
            data-test-id='day-button'
            className={`day ${weekday} ${isFriday() ? 'active' : getActiveDays()} ${day.isToday ? 'today ' : ''} ${day.date.isSame(selected) && isClick ? 'selected' : ''}`}
            onClick={() => checkClick()}
        >
            {day.number}
        </span>
    );
}
