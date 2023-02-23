import { Moment } from 'moment';

export interface IDay {
    value: Moment;
    active: boolean;
    disabled: boolean;
    selected: boolean;
}

export interface IWeek {
    days: IDay[]
}
