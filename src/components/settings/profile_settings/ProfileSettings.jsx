import { useState } from "react";
import { ConfirmationPopup } from "../common/ConfirmationPopup";
import { FormInput } from "../common/FormInput";
import { ActionButton } from "../../common/buttons/ActionButton";
import { SectionHeader } from "../common/SectionHeader";

export default function ProfileSettings() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
  });

  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    displayName: "",
    bio: "",
    location: "",
  });

  const [isDirty, setIsDirty] = useState({
    displayName: false,
    bio: false,
    location: false,
  });

  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
    setIsDirty({ ...isDirty, [field]: true });
    setErrors({ ...errors, [field]: "" });
  };

  // Trigger the popup for a single field
  const handleFieldUpdate = (field) => {
    if (!profile[field]) {
      setErrors({ ...errors, [field]: "This field cannot be empty" });
      return;
    }

    setPopupContent({
      title: `Update ${field}`,
      description: `Are you sure you want to update your ${field}?`,
      actionType: "confirm",
    });
    setPopupOpen(true);
  };

  // Trigger the popup for saving all changes
  const handleSaveAll = () => {
    const dirtyFields = Object.keys(isDirty).filter((key) => isDirty[key]);
    if (dirtyFields.length === 0) return;

    const emptyFields = dirtyFields.filter((key) => !profile[key]);
    if (emptyFields.length > 0) {
      const newErrors = { ...errors };
      emptyFields.forEach(
        (field) => (newErrors[field] = "This field cannot be empty")
      );
      setErrors(newErrors);
      return;
    }

    setPopupContent({
      title: "Save All Changes",
      description: `Are you sure you want to save changes to: ${dirtyFields.join(", ")}?`,
      actionType: "confirm",
    });
    setPopupOpen(true);
  };

  const anyDirty = Object.values(isDirty).some((dirty) => dirty);

  return (
    <div className="px-8 pt-4 flex flex-col gap-8">
      <ConfirmationPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupContent.title}
        description={popupContent.description}
        actionType={popupContent.actionType}
      />

      {/* Display Name */}
      <div>
        <SectionHeader title="Change your display name" />

        <FormInput
          id="displayName"
          label="Display Name"
          value={profile.displayName}
          error={errors.displayName}
          isDirty={isDirty.displayName}
          onChange={(e) => handleChange(e, "displayName")}
          placeholder="Enter your display name"
        />
      </div>

      {/* Bio */}
      <div>
        <SectionHeader title="Change your bio" />

        <FormInput
          id="bio"
          label="Bio"
          value={profile.bio}
          error={errors.bio}
          isDirty={isDirty.bio}
          onChange={(e) => handleChange(e, "bio")}
          placeholder="Tell us about yourself"
        />
      </div>

      {/* Location */}
      <div>
        <SectionHeader title="Change your location" />
        <FormInput
          id="location"
          label="Location"
          value={profile.location}
          error={errors.location}
          isDirty={isDirty.location}
          onChange={(e) => handleChange(e, "location")}
          placeholder="Where are you based?"
        />
      </div>

      <div className="mt-4">
        <ActionButton
          label="Save Changes"
          value="save-all"
          error={false}
          isDirty={anyDirty}
          onClick={handleSaveAll}
        />
      </div>
    </div>
  );
}
