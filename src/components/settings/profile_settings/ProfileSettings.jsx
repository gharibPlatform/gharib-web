import { useState } from "react";
import { ConfirmationPopup } from "../common/ConfirmationPopup";
import ProfileForm from "./ProfileForm";
import ProfilePictureEditor from "./ProfilePictureEditor";

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
    profilePic: null,
    profilePicPreview: "",
  });

  const [errors, setErrors] = useState({
    displayName: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  const [isDirty, setIsDirty] = useState({
    displayName: false,
    bio: false,
    location: false,
    profilePic: false,
  });

  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
    setIsDirty({ ...isDirty, [field]: true });
    setErrors({ ...errors, [field]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profilePic: file,
          profilePicPreview: reader.result,
        });
        setIsDirty({ ...isDirty, profilePic: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    const dirtyFields = Object.keys(isDirty).filter((key) => isDirty[key]);
    if (dirtyFields.length === 0) return;

    const emptyFields = dirtyFields.filter(
      (key) => !profile[key] && key !== "profilePic"
    );
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

  const handleSavePicture = () => {
    setPopupContent({
      title: "Save Profile Picture",
      description: "Are you sure you want to update your profile picture?",
      actionType: "confirm",
    });
    setPopupOpen(true);
  };

  const anyDirty = Object.values(isDirty).some((dirty) => dirty);

  return (
    <div className="flex flex-row p-8 gap-12">
      <div className="flex-1 max-w-2xl">
        <ConfirmationPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          title={popupContent.title}
          description={popupContent.description}
          actionType={popupContent.actionType}
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
