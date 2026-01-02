import indexToString from "./indexToStringSurah.json";
export const surahOptions = Object.entries(indexToString).map(
  ([number, data]) => ({
    number: parseInt(number),
    name: data.name,
    verses: data.verses,
  })
);
