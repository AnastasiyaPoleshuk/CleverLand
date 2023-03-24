import { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

export interface IDay {
    date: Moment,
    isMonday: boolean,
    isToday: boolean,
    name: string,
    number: number,
}

export interface IDayProps {
    hasBooking: boolean,
    day: IDay,
    select: (day: IDay) => void,
    selected: Moment,
}


export const Day = (props: IDayProps) => {
    const { day, select, selected, hasBooking } = props;
    const [isClick, setIsClick] = useState(hasBooking);
    const [classString, setClassString] = useState('day');
    const weekend = day.name === 'сб' || day.name === 'вс' ? 'weekend' : '';


    const getActiveDays = () => {
        const tomorrow = day.date.clone();


        if (
            tomorrow.subtract(1, 'd').date() === moment().date() &&
            day.date.day() !== 6 &&
            day.date.day() !== 0
        ) {

            return true;
        }

        return false;
    }

    const getSelectedDays = () => {

        if (day.date.isSame(selected) && isClick) {
            return true;
        }

        return false;
    }

    const isWeekend = () => {

        if (
            day.name === 'пн' &&
            day.date.day() !== 6 &&
            day.date.dayOfYear() === moment().dayOfYear() + 2
        ) {
            day.isMonday = true;

            return true;
        }

        if (
            day.name === 'пн' &&
            day.date.day() !== 0 &&
            day.date.dayOfYear() === moment().dayOfYear() + 1
        ) {
            day.isMonday = true;

            return true;
        }

        return false;
    }

    const isFriday = () => {

        if (
            day.name === 'пн' &&
            moment().day() === 5 &&
            day.date.dayOfYear() === moment().dayOfYear() + 3
        ) {
            day.isMonday = true;

            return true;
        }

        return false;
    }


    const createClassNamesString = () => {
        let classNamesString = '';

        if (isWeekend() || isFriday() || getActiveDays()) {
            classNamesString += ' active';
        };

        if (day.isToday && !getSelectedDays()) {
            classNamesString += ' today';
        };

        setClassString(`${classString} ${weekend} ${classNamesString}`);
    }

    const checkClick = () => {

        if (day.date.day() !== 6 &&
            day.date.day() !== 0) {
            isClick ? null : setIsClick(true);
            select(day);
        }

    }


    useEffect(createClassNamesString, [])
    useEffect(createClassNamesString, [select])

    return (
        <span
            key={day.date.toString()}
            data-test-id='day-button'
            className={`${classString} ${getSelectedDays() && 'selected'}`}
            onClick={checkClick}
        >
            {day.number}
        </span>
    );
}
