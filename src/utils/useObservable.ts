import { Observable, Subscription } from 'rxjs';
import { DependencyList, useEffect, useRef, useState } from 'react';
import { shallowArrayComparison } from './shallowArrayComparison';

interface IUseObservableHookStore<T> {
    value?: T,
    subscription?: Subscription,
    deps: DependencyList
    subscribed: boolean
}

//https://habr.com/ru/company/Social_Discovery_Group/blog/645455/
export function useObservable<T>(src: () => Observable<T>, deps: DependencyList, initial: T): T
export function useObservable<T>(src: () => Observable<T>, deps: DependencyList): T | undefined
export function useObservable<T>(src: () => Observable<T>, deps: DependencyList, initial?: T): T | undefined {
    const [ , reload ] = useState({})
    const store = useRef<IUseObservableHookStore<T>>({
        value: initial,
        subscription: undefined,
        deps: deps,
        subscribed: false
    })

    useEffect(() => {
        const storeValue = store.current
        return (): void => {
            storeValue.subscription?.unsubscribe()
        }
    }, [])

    if (!store.current.subscription || !shallowArrayComparison(deps, store.current.deps)) {
        if (store.current.subscription) {
            store.current.subscription.unsubscribe()
            store.current.value = initial
            store.current.deps = deps
            store.current.subscribed = false
        }
        store.current.subscription = src()
          // .pipe(catchError())
          .subscribe(value => {
              if (store.current.value !== value) {
                  store.current.value = value
                  if (store.current.subscribed) {
                      reload({})
                  }
              }
          })
        store.current.subscribed = true
    }

    return store.current.value
}
