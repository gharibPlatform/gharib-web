import { ActionButton } from "../../common/buttons/ActionButton";
import { SectionHeader } from "../common/SectionHeader";

export default function ProfilePictureEditor({
  profile,
  handleImageChange,
  handleSavePicture,
  isDirty,
}) {
  return (
    <div className="sticky top-8 flex flex-col items-center gap-6 p-6  rounded-xl">
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-2">
        {profile.profilePicPreview ? (
          <img
            src={profile.profilePicPreview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 w-1/2">
        <label
          className={`mt-2 px-4 py-2 flex justify-center items-center rounded-[4px] border w-full whitespace-nowrap
           cursor-pointer bg-[var(--main-color)] text-[var(--w-color)] border-[var(--g-color)] hover:bg-[var(--main-color-hover)]`}
        >
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <p className="text-sm text-gray-500 text-center">
          JPEG, PNG or GIF (Max. 5MB)
        </p>

        {isDirty.profilePic && (
          <ActionButton
            label="Save Profile Picture"
            value="save-pic"
            error={false}
            isDirty={isDirty.profilePic}
            onClick={handleSavePicture}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}
