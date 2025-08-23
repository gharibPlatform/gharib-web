import QuranPage from "./QuranPage";

export default function QuranSurah({
  cache,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
}) {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      {Object.entries(cache).map(([pageNumber, verses]) => (
        <QuranPage
          key={pageNumber}
          verses={verses}
          pageNumber={pageNumber}
          setClickBoxBool={setClickBoxBool}
          setBoxPosition={setBoxPosition}
          setVerseKey={setVerseKey}
        />
      ))}
    </div>
  );
}
