/* eslint-disable no-plusplus */
import { useEffect, useState, } from 'react';
import moment, { Moment } from 'moment';

import { CONSTANTS } from '../../utils/constants';

import { IDay } from './components/Day';
import { DayNames } from './components/DayNames';
import { Week } from './components/Week';

import './Calendar.scss';

interface IProps {
    hasBooking: boolean,
    selected: Moment,
    setSelected: (selected: Moment) => void,
    setDisabled: (disabled: boolean) => void,
}


export const Calendar = (props: IProps) => {
    const { hasBooking, setDisabled, selected, setSelected } = props;
    const [month, setMonth] = useState(moment());
    const [weeks, setWeeks] = useState<JSX.Element[]>([]);

    useEffect(() => renderWeeks(), [])

    const previous = () => {
        setMonth(month.subtract(1, 'month'));
        renderWeeks()
    }

    const next = () => {
        setMonth(month.add(1, 'month'));
        renderWeeks();
    }

    const renderMonthLabel = () => {

        const setSelectedMonth = (monthName: string) => {
            const monthId = CONSTANTS.MONTH_DATA.find(monthItem => monthItem.nameEn === monthName);

            setMonth(month.set('month', monthId?.id || -1));
            renderWeeks();
        }

        return (
            <select className="month-label" data-test-id='month-select' onChange={(e) => setSelectedMonth(e.target.value as string)}>
                {
                    CONSTANTS.MONTH_DATA.map(elem =>
                        <option
                            key={elem.id}
                            value={elem.nameEn}
                            selected={elem.nameEn === month.format('MMMM')}
                        >
                            {`${elem.nameRu} ${month.format('YYYY')}`}
                        </option>
                    )
                }
            </select>
        )
    }

    const select = (day: IDay) => {

        if (day.isToday || day.date.clone().subtract(1, 'd').date() === moment().date() || day.isMonday) {
            setSelected(day.date.clone());

            setMonth(month.clone().set('date', day.date.date()));
            setSelected(selected.set('date', day.date.date()));
            setDisabled(false)
            renderWeeks()
        }
    }

    function renderWeeks() {

        const weeksArr = [];
        let done = false;

        const date = month.clone().startOf('month').day('понедельник');
        let count = 0;
        let monthIndex = month.month();

        while (!done) {
            weeksArr.push(
                <Week key={date.dayOfYear()}
                    date={date.clone()}
                    select={(day: IDay) => select(day)}
                    selected={selected}
                    hasBooking={hasBooking}
                />
            );

            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        setWeeks(weeksArr);
    };

    return (
        <section className="calendar" data-test-id='calendar'>
            <header className="calendar__header">
                <div className="month-display row">
                    {renderMonthLabel()}
                    <i className="arrow fa fa-angle-left" data-test-id='button-next-month' onClick={next} />
                    <i className="arrow fa fa-angle-right" data-test-id='button-prev-month' onClick={previous} />
                </div>
                <DayNames />
            </header>
            {weeks}
        </section>
    )
}
