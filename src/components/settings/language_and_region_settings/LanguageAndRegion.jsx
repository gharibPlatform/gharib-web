import { useState } from "react";
import { CustomDropdown } from "../common/CustomDropdown";
import { useLanguageAndRegionSettings } from "../../../hooks/settings/useLanguageAndRegionSettings";
import { ActionButton } from "../../common/buttons/ActionButton";

export default function LanguageAndRegion() {
  const {
    language,
    region,
    isDirty,
    availableLanguages,
    availableRegions,
    handleLanguageChange,
    handleRegionChange,
    handleSave,
  } = useLanguageAndRegionSettings();

  const [rotate, setRotate] = useState(90);
  const changeRotation = () => {
    setRotate((prev) => (prev === 90 ? 270 : 90));
  };

  return (
    <div className="px-8 pt-4 flex flex-col">
      {/* Language Section */}
      <div className="flex flex-col pt-4">
        <h1 className="text-white font-medium text-3xl">Language</h1>
        <div className="flex items-center justify-center py-2 w-4/5 pb-4">
          <div className="border-t border-[var(--g-color)] w-full"></div>
        </div>
        <CustomDropdown
          value={language}
          onChange={handleLanguageChange}
          options={availableLanguages}
          rotate={rotate}
          setRotate={setRotate}
          onClick={changeRotation}
          label="Select your preferred language"
          description="Choose between English and Arabic"
        />
      </div>

      {/* Region Section */}
      <div className="flex flex-col pt-8">
        <h1 className="text-white font-medium text-3xl">Region</h1>
        <div className="flex items-center justify-center py-2 w-4/5 pb-4">
          <div className="border-t border-[var(--g-color)] w-full"></div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div>
            <h2 className="text-white text-lg">Select your country</h2>
            <p className="text-[var(--g-color)] text-sm">
              Choose your country from the list
            </p>
          </div>

          <select
            value={region}
            onChange={handleRegionChange}
            className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none"
          >
            <option value="">-- Select Country --</option>
            {availableRegions.map(({ value, label }) => (
              <option
                key={value}
                value={value}
                className="bg-[var(--main-color)] text-white"
              >
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex">
        <ActionButton
          label="Save Changes"
          value="dirty-check"
          isDirty={isDirty}
          isDisabled={false}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
