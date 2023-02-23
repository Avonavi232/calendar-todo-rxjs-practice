import cn from 'classnames';
import type { FC } from 'react';

import styles from './styles.module.scss';
import { dateService } from '../../services/dateService';
import { useObservable } from '../../utils/useObservable';
import { useCallback, useMemo } from 'react';
import moment from 'moment';
import { IDay, IWeek } from './types';
import { momentTransform } from '../../utils/momentTransform';

export interface ICalendarProps {
    className?: string;
}

export const Calendar: FC<ICalendarProps> = ({ className }) => {
    const currentMoment = useObservable(() => dateService.moment$, [])

    const calendar = useMemo(() => {
        if (!currentMoment) {
            return null
        }

        const startDay = currentMoment.clone().startOf('month').startOf('week');
        const endDay = currentMoment.clone().endOf('month').endOf('week');

        const date = startDay.clone().subtract(1, 'day');
        const calendar: IWeek[] = [];

        while (date.isBefore(endDay, 'day')) {
            calendar.push({
                days: Array(7).fill(0).map(() => {
                    const value = date.add(1, 'day').clone();
                    const active = moment().isSame(value, 'date');
                    const disabled = !currentMoment.isSame(value, 'month');
                    const selected = currentMoment.isSame(value, 'date');

                    return { value, active, disabled, selected }
                })
            })
        }

        return calendar
    }, [ currentMoment ])

    const selectDay = useCallback((day: IDay) => {
        dateService.setDate(day.value);
    }, [])

    if (!calendar) {
        return null
    }

    return (
      <div className={cn(className, styles['container'])}>
          <table className={styles['table']}>
              <thead>
              <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wen</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
              </tr>
              </thead>
              <tbody>
              {calendar.map((week, weekIndex) => (
                <tr key={weekIndex}>
                    {
                        week.days.map((day, dayIndex) => (
                          <td
                            key={dayIndex}
                            className={cn(day.disabled && styles['disabled'])}
                            onClick={() => selectDay(day)}
                          >
                              <span
                                className={cn(day.selected && styles['selected'], day.active && styles['active'])}
                              >
                                  {momentTransform(day.value, 'ddd DD')}
                              </span>
                          </td>
                        ))
                    }
                </tr>
              ))}
              </tbody>
          </table>
      </div>
    );
};
