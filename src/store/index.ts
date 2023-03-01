import { create } from 'zustand';

interface IState {
  backgroundColor: string;
  changeBackgroundColor: (color: string) => void;
}

export const useStore = create<IState>()((set) => ({
  backgroundColor: "#000",
  changeBackgroundColor: (color) => set(() => ({ backgroundColor: color }))
}));