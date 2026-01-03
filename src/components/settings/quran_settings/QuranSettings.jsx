// components/settings/QuranSettings.jsx
import { useState } from "react";
import { SectionHeader } from "../common/SectionHeader";
import { CustomDropdown } from "../common/CustomDropdown";
import { ConfirmationPopup } from "../common/ConfirmationPopup";
import { useQuranSettings } from "../../../hooks/settings/useQuranSettings";
import { ActionButton } from "../../common/buttons/ActionButton";

export default function QuranSettings() {
  const {
    settings,
    isDirty,
    isLoading,
    options,
    popupOpen,
    popupContent,
    setPopupOpen,
    handleSettingChange,
    handleSave,
  } = useQuranSettings();

  const [rotate, setRotate] = useState({
    reciter: 90,
    translation: 90,
    tafsir: 90,
  });

  const handlePopupConfirm = () => {
    if (popupContent.onConfirm) {
      popupContent.onConfirm();
    }
  };

  return (
    <div className="px-8 pt-4 flex flex-col">
      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handlePopupConfirm}
        title={popupContent.title}
        description={popupContent.description}
        actionType={popupContent.actionType}
        isLoading={isLoading}
      />

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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>

      {/* Save Button */}
      <div className="flex pb-8 mt-8">
        <ActionButton
          label={isLoading ? "Saving..." : "Save Changes"}
          value="dirty-check"
          isDirty={isDirty}
          isDisabled={!isDirty || isLoading}
          onClick={handleSave}
          className="min-w-[120px]"
        />
      </div>
    </div>
  );
}
