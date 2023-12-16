import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export const useShaderStore = create((set) => ({
  shader: 2,
  update: (prop, value) => set({ [prop]: value }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useStore", useShaderStore);
}
