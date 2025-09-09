import VersePopup from "./VersePopup";

export default function VersePopupController({
  clickBoxBool,
  boxRef,
  boxPosition,
  scrollRef,
  playVerse,
  setClickBoxBool,
  handleHighlightVerse,
}) {
  if (!clickBoxBool) return null;

  return (
    <div ref={boxRef}>
      <VersePopup
        left={boxPosition.x}
        top={boxPosition.y + (scrollRef.current?.scrollTop || 0)}
        playVerse={playVerse}
        setClickBoxBool={setClickBoxBool}
        handleHighlightVerse={handleHighlightVerse}
      />
    </div>
  );
}
