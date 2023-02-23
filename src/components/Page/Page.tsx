import type { FC } from 'react';

import styles from './styles.module.css';
import { Selector } from '../Selector';
import { Calendar } from '../Calendar';
import { Organizer } from '../Organizer';
import React from 'react';


export const Page: FC = () => {
    return (
      <div className={styles['container']}>
          <header className={styles['header']}>
              <Selector/>
          </header>

          <main>
              <Calendar/>
          </main>

          <div>
              <Organizer/>
          </div>
      </div>
    );
};
