import { create } from 'zustand';

interface IState {
  backgroundColor: string;
  descriptionList: IDescriptionList[],
  populateDescriptionList: (list: IDescriptionList[]) => void;
  changeBackgroundColor: (color: string) => void;
}

interface IDescriptionList {
  name: string;
  englishDescription: string;
  frenchDescription: string;
}

export const useStore = create<IState>()((set) => ({
  backgroundColor: "#000",
  descriptionList: [],
  populateDescriptionList: (list) => set(() => ({ descriptionList: list })),
  changeBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
}));