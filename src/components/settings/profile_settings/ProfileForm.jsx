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
      <div className="pt-4">
        <SectionHeader title="Change your full name" />
        <FormInput
          id="fullname"
          label="Full Name"
          value={profile.fullname}
          error={errors.fullname}
          isDirty={isDirty.fullname}
          onChange={(e) => handleChange(e, "fullname")}
          placeholder="Enter your full name"
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
