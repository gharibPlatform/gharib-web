import { create } from 'zustand';

const useBeginningOfTheSurah = create((set) => ({
    beginningOfTheSurah: false,
    setBeginningOfTheSurah: (bool) => set({ beginningOfTheSurah: bool }),
}));

export default useBeginningOfTheSurah;
