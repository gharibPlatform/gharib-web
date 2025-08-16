import { useState } from "react";
import { CustomDropdown } from "../common/CustomDropdown";
import { useLanguageAndRegionSettings } from "../../../hooks/settings/useLanguageAndRegionSettings";
import { FormInput } from "../common/FormInput";

export default function LanguageAndRegion() {
  const {
    language,
    region,
    isDirty,
    availableLanguages,
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
          onClick={changeRotation} // this toggles rotation
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

        <FormInput
          value={region}
          onChange={handleRegionChange}
          placeholder="e.g. United States, Saudi Arabia, etc."
          label="Enter your region"
          description="Specify your geographic location (country, city, etc.)"
        />
      </div>

      {/* Save Button */}
      <div className="flex">
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
