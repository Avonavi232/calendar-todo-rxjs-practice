import moment, {Moment} from 'moment';
import { BehaviorSubject, map } from 'rxjs';
import { momentTransform } from '../utils/momentTransform';

export class DateService {
    public moment$: BehaviorSubject<Moment> = new BehaviorSubject(moment());

    changeMonth = (dir: number) => {
        const nextDate = this.moment$.value.add(dir, 'month');

        this.moment$.next(nextDate.clone());
    }

    setDate = (date: Moment) => {
        const nextDate = this.moment$.value.set({
            date: date.date(),
            month: date.month(),
        });

        this.moment$.next(nextDate.clone());
    }

    getFormattedDateObservable = (format?: string) => {
        return this.moment$.pipe(map(m => momentTransform(m, format)));
    }
}

export const dateService = new DateService();
