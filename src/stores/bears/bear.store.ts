import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];  

  calculateTotalBears (): number;

  increaseBlackBears: ( by: number ) => void;
  increasePolarBears: ( by: number ) => void;
  increasePandaBears: ( by: number ) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}


export const useBearStore = create<BearState>()(

  persist(
    (set, get): BearState => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      
      bears: [{ id: 1, name: "Oso #1"}],

      calculateTotalBears: () => {
        return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      },

      increaseBlackBears: ( by: number ) => set( state => ({ blackBears: state.blackBears + by})),
      increasePolarBears: ( by: number ) => set( state => ({ polarBears: state.polarBears + by})),
      increasePandaBears: ( by: number ) => set( state => ({ pandaBears: state.pandaBears + by})),

      doNothing: () => set( state => ({ bears: [...state.bears]})),
      addBear: () => set( state => ({ 
        bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`}]
      })),
      clearBears: () => set({ bears: [] }),

    }),
    {
      name: 'bear-store'
    }
  )
);