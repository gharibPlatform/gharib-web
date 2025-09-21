import { FormInput } from "../../common/input/FormInput";
import { ActionButton } from "../../common/buttons/ActionButton";
import { SectionHeader } from "../common/SectionHeader";

export default function ProfileForm({
  profile,
  errors,
  isDirty,
  handleChange,
  handleSaveAll,
  anyDirty,
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* Display Name */}
      <div className="pt-4">
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
          isDirty={anyDirty}
          isDisabled={false}
          onClick={handleSaveAll}
        />
      </div>
    </div>
  );
}
