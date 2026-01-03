import { useEffect } from "react";
import { ConfirmationPopup } from "../common/ConfirmationPopup";
import ProfileForm from "./ProfileForm";
import ProfilePictureEditor from "./ProfilePictureEditor";
import { useProfileSettings } from "../../../hooks/settings/useProfileSettings";

export default function ProfileSettings() {
  const {
    profile,
    errors,
    isDirty,
    isLoading,
    popupOpen,
    popupContent,
    anyDirty,
    setPopupOpen,
    handleChange,
    handleImageChange,
    handleSaveAll,
    handleSavePicture,
    loadInitialData,
  } = useProfileSettings();

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handlePopupConfirm = () => {
    if (popupContent.onConfirm) {
      popupContent.onConfirm();
    }
  };

  return (
    <div className="flex flex-row p-8 gap-12">
      <div className="flex-1 max-w-2xl">
        <ConfirmationPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handlePopupConfirm}
          title={popupContent.title}
          description={popupContent.description}
          actionType={popupContent.actionType}
          isLoading={isLoading}
        />

        <ProfileForm
          profile={profile}
          errors={errors}
          isDirty={isDirty}
          handleChange={handleChange}
          handleSaveAll={handleSaveAll}
          anyDirty={anyDirty}
        />
      </div>

      <div className="flex-1 max-w-md">
        <ProfilePictureEditor
          profile={profile}
          handleImageChange={handleImageChange}
          handleSavePicture={handleSavePicture}
          isDirty={isDirty}
        />
      </div>
    </div>
  );
}
