import { create } from "zustand";

interface StoreType {
  chatModel: string;
  writingStyle: string;
  temperature: number;
  updateStore: (newStore: Partial<StoreType>) => void;
}

const useStore = create<StoreType>((set) => ({
  chatModel: "chat-model-small",
  writingStyle: "casual",
  temperature: 0.5,
  updateStore: (newStore: Partial<StoreType>) =>
    set((state) => ({ ...state, ...newStore }))
}));

export { useStore };
