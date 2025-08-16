import { useState } from "react";
import { SectionHeader } from "../common/SectionHeader";
import { CustomDropdown } from "../common/CustomDropdown";
import { useQuranSettings } from "../../../hooks/settings/useQuranSettings";

export default function QuranSettings() {
  const { settings, isDirty, options, handleSettingChange, handleSave } =
    useQuranSettings();

  const [rotate, setRotate] = useState({
    reciter: 90,
    translation: 90,
    tafsir: 90,
  });

  return (
    <div className="px-8 pt-4 flex flex-col">
      {/* Reciter Section */}
      <div className="flex flex-col pt-4">
        <SectionHeader title="Reciter" />
        <CustomDropdown
          value={settings.reciter}
          onChange={(e) => handleSettingChange("reciter", e.target.value)}
          options={options.reciters}
          rotate={rotate.reciter}
          setRotate={(val) => setRotate((prev) => ({ ...prev, reciter: val }))}
          label="Select your preferred reciter"
          description="Choose from the list of available reciters"
        />
      </div>

      {/* Translation Section */}
      <div className="flex flex-col pt-8">
        <SectionHeader title="Translation" />
        <CustomDropdown
          value={settings.translation}
          onChange={(e) => handleSettingChange("translation", e.target.value)}
          options={options.translations}
          rotate={rotate.translation}
          setRotate={(val) =>
            setRotate((prev) => ({ ...prev, translation: val }))
          }
          label="Select your preferred translation"
          description="Choose from the list of available translations"
        />
      </div>

      {/* Tafsir Section */}
      <div className="flex flex-col pt-8">
        <SectionHeader title="Tafsir" />
        <CustomDropdown
          value={settings.tafsir}
          onChange={(e) => handleSettingChange("tafsir", e.target.value)}
          options={options.tafsirs}
          rotate={rotate.tafsir}
          setRotate={(val) => setRotate((prev) => ({ ...prev, tafsir: val }))}
          label="Select your preferred tafsir"
          description="Choose from the list of available tafsirs"
        />
      </div>

      {/* Save Button */}
      <div className="flex pb-8">
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className={`bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap ${
            isDirty
              ? "hover:bg-[var(--main-color-hover)] hover:text-white cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
