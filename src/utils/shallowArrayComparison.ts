import { DependencyList } from 'react';

export function shallowArrayComparison(array1: DependencyList, array2: DependencyList): boolean {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}
