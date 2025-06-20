import { createJSONStorage, StateStorage } from "zustand/middleware";

const storeApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name);  
    return data;
  },
  setItem: function (name: string, value: string): void {
    // console.log({name, value});
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log('removeItem', { name });
    return;
  }
};

export const customSessionStorage = createJSONStorage( () => storeApi)