import { create } from "zustand";

interface Store {
  chatModel: string;
  writingStyle: string;

  updateStore: (newStore: Partial<Store>) => void;
}

const useStore = create<Store>((set) => ({
  chatModel: "chat-model-small",
  writingStyle: "casual",
  updateStore: (newStore: Partial<Store>) =>
    set((state) => ({ ...state, ...newStore }))
}));

export { useStore };
