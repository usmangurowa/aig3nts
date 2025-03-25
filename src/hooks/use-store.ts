import { create } from "zustand";

interface Store {
  chatModel: string;
  writingStyle: string;
  temperature: number;
  updateStore: (newStore: Partial<Store>) => void;
}

const useStore = create<Store>((set) => ({
  chatModel: "chat-model-small",
  writingStyle: "casual",
  temperature: 0.5,
  updateStore: (newStore: Partial<Store>) =>
    set((state) => ({ ...state, ...newStore }))
}));

export { useStore };
