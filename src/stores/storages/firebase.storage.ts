// import { createJSONStorage, StateStorage } from "zustand/middleware";

// const fireBaseUrl = 'https://aaaaaaaaaa/zustand';

// const storeApi: StateStorage = {
//   getItem: async function (name: string): Promise<string | null> {

//     try {
//       const data = await fetch(`${ fireBaseUrl }/${ name }.json`)
//                             .then( res => res.json());
//       return JSON.stringify( data );
//     } catch (error) {
//       throw error as unknown
//     }
//   },
//   setItem: async function (name: string, value: string): Promise<void> {
//     return await fetch(`${ fireBaseUrl }/${ name }.json`, { method: 'PUT', body: value })
//                             .then( res => res.json() );
//   },
//   removeItem: function (name: string): unknown | Promise<unknown> {
//     console.log('removeItem', { name });
//     return;
//   }
// };

// export const fireBaseStorage = createJSONStorage( () => storeApi)