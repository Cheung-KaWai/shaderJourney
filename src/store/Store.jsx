import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export const useShaderStore = create((set) => ({
  shader: {
    index: 1.01,
    name: "uv.x",
  },
  code: {
    show: false,
    file: 0,
  },
  update: (prop, value) => set((state) => ({ [prop]: value })),
  updateObject: (object, field, value) =>
    set(
      (state) =>
        (state = {
          ...state,
          [object]: { ...state[object], [field]: value },
        })
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useStore", useShaderStore);
}
