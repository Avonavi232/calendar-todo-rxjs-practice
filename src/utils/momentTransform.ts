import {Moment} from 'moment';

export const momentTransform = (m: Moment, format: string = 'MMMM YYYY'): string => {
    return m.format(format)
}
