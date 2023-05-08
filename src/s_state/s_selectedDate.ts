import { signal } from '@preact/signals-react';
import moment from 'moment';
export const sSelectedDate = signal<string>(moment(new Date()).format("YYYY-MM-DD"));