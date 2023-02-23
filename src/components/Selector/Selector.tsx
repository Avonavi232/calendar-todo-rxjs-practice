import cn from 'classnames';
import type { FC } from 'react';

import styles from './styles.module.css';
import { dateService } from '../../services/dateService';
import { useObservable } from '../../utils/useObservable';

export interface ISelectorProps {
    className?: string;
}

export const Selector: FC<ISelectorProps> = ({ className }) => {
    const formattedDate = useObservable(dateService.getFormattedDateObservable, [], '');

    const increaseMonth = () => dateService.changeMonth(1);
    const decreaseMonth = () => dateService.changeMonth(-1);

    return (
      <div className={cn(className, styles['container'])}>
          <i className={cn(styles['icon'], 'material-icons')} onClick={decreaseMonth}>arrow_left</i>
          <span className={styles['date']}>{formattedDate}</span>
          <i className={cn(styles['icon'], 'material-icons')} onClick={increaseMonth}>arrow_right</i>
      </div>
    );
};
