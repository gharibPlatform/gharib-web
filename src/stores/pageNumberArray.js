import { create } from 'zustand';

const useAddPageNumber = create((set) => ({
  pageNumberArray: [],
  currentPageNumber: 0,

  addPageNumber: (yPosition) =>
    set((state) => {
      if (typeof yPosition === 'number') {
        return {
          pageNumberArray: [...state.pageNumberArray, yPosition],
        };
      }
      return state; 
    }),

  // Fix: Change `count` to `currentPageNumber`
  increment: () => set((state) => ({ currentPageNumber: state.currentPageNumber + 1 })),
  decrement: () => set((state) => ({ currentPageNumber: state.currentPageNumber - 1 })),
  setCurrentPageNumber: (current) => set({ currentPageNumber: current }),
}));

export default useAddPageNumber;
