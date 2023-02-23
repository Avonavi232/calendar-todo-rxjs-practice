import { Database, DatabaseReference, child, set, ref, push, onValue, remove } from 'firebase/database'
import { database } from '../firebaseInit';
import { from, Observable, map, BehaviorSubject } from 'rxjs';

export interface ITaskDraft {
    id?: string;
    title: string;
    date: string;
}

export interface ITask extends ITaskDraft {
    id: string;
}

export type TStoreTasks = Record<string, Omit<ITask, 'id'>>;

export class TasksService {
    private readonly db: Database;
    private readonly tasksRef: DatabaseReference

    constructor() {
        this.db = database;
        this.tasksRef = ref(this.db, 'tasks');
    }

    public getTasksByDateObservable(date: string): Observable<ITask[]> {
        const taskByDateRef = child(this.tasksRef, date);
        return new Observable<ITask[]>(subscriber => {
            const obs$ = new BehaviorSubject<ITask[]>([]);

            const unsubscribe = onValue(taskByDateRef, snapshot => {
                const data = snapshot.val() as TStoreTasks | null;

                if (!data) {
                    obs$.next([]);
                    return;
                }

                const tasks: ITask[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                obs$.next(tasks);
            });

            const innerSubscription = obs$.subscribe(subscriber);

            return () => {
                unsubscribe();
                innerSubscription.unsubscribe();
            }
        });
    }

    public removeTask(task: ITask) {
        const taskRef = child(this.tasksRef, `${task.date}/${task.id}`);
        return remove(taskRef);
    }

    public create(task: ITaskDraft): Observable<ITask> {
        const newTaskRef = push(child(this.tasksRef, task.date));
        const p = set(newTaskRef, task);
        return from(p)
          .pipe(map(() => ({ ...task, id: newTaskRef.key as string })))
    }
}

export const tasksService = new TasksService();
