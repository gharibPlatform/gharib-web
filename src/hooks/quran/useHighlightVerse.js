import { useCallback } from "react";

export function useHighlightVerse(setClickBoxBool, setShowHighlightsConfirmation) {
  return useCallback(() => {
    setClickBoxBool(false);
    setShowHighlightsConfirmation(true);
  }, [setClickBoxBool, setShowHighlightsConfirmation]);
}