import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// import { customSessionStorage } from "../storages/session.storage";
// import { fireBaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator< PersonState & Actions, [["zustand/devtools", never], ["zustand/persist", unknown]] > = (set/* , get */) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(({ firstName: value}), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value}), false, 'setLasttName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeApi,
      { 
        name: 'person-storage',
        // storage: customSessionStorage
        // storage: fireBaseStorage
      }
    )
  )
);