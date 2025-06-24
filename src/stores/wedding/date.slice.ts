import { StateCreator } from "zustand";
import { format, parse, setHours, setMinutes } from 'date-fns';

export interface DateSlice {
  eventDate: Date;

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEvenDate: (parcialDate: string) => void;
  setEvenTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set,get) => ({
  eventDate: new Date(),
  eventYYYYMMDD: () => {
    return format(get().eventDate, 'yyyy-MM-dd');
  },
  eventHHMM: () => {
    return format(get().eventDate, 'HH:mm');
  },
  setEvenDate: ( parcialDate: string ) => set(() => {
    const current = get().eventDate;

    const parsedDate = parse(parcialDate, 'yyyy-MM-dd', new Date(0));
    const combined = setMinutes(setHours(parsedDate, current.getHours()), current.getMinutes());
    return { eventDate: combined };
  }),
  setEvenTime: ( parcialTime: string) => set( state => {
    const [hoursStr, minutesStr] = parcialTime.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const updated = setMinutes(setHours(state.eventDate, hours), minutes);
    return { eventDate: updated };
  })
})