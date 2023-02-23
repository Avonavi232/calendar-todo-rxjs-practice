import cn from 'classnames';
import type { FC, FormEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { switchMap } from 'rxjs';

import { dateService } from '../../services/dateService';
import { useObservable } from '../../utils/useObservable';
import { ITask, ITaskDraft, tasksService } from '../../services/tasksService';

import styles from './styles.module.scss';

export interface IOrganizerProps {
    className?: string;
}

interface IMyFormElement extends HTMLFormElement {
    task: HTMLInputElement;
}

export const Organizer: FC<IOrganizerProps> = ({ className }) => {
    const formattedDate = useObservable(() => dateService.getFormattedDateObservable('DD-MM-YYYY'), []);
    const [ tasks, setTasks ] = useState<ITask[]>([]);

    const submitFormHandler = useCallback<FormEventHandler>(e => {
        e.preventDefault();
        if (!formattedDate) {
            return
        }

        const task: ITaskDraft = {
            title: (e.target as IMyFormElement).task.value,
            date: formattedDate
        };

        (e.target as IMyFormElement).reset();

        tasksService.create(task)
    }, [ formattedDate ]);

    useEffect(() => {
        dateService
          .getFormattedDateObservable('DD-MM-YYYY')
          .pipe(switchMap(date => tasksService.getTasksByDateObservable(date)))
          .subscribe(setTasks);
    }, []);

    return (
      <section className={cn(className, styles['container'])}>
          <header>
              Organizer: <strong>{formattedDate}</strong>
          </header>

          <main>
              <ul>
                  {
                      tasks.map((task, index) => (
                        <li key={task.id} className={styles['task']}>
                            <p className={styles['title']}>
                                <strong>{index + 1}</strong>
                                {task.title}
                            </p>
                            <button className={cn('btn', 'btn-primary')} onClick={() => tasksService.removeTask(task)}>
                                Remove
                            </button>
                        </li>
                      ))
                  }
              </ul>
          </main>

          <footer>
              <form onSubmit={submitFormHandler}>
                  <input type="text" name="task"/>
                  <button className={cn('btn', 'btn-primary', 'btn-block')}>Add</button>
              </form>
          </footer>
      </section>
    );
};
