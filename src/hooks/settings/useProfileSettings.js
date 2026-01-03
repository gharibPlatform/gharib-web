import { useState, useCallback } from "react";
import { patchSettings, getSettings } from "../../utils/apiSettings";

export function useProfileSettings() {
  const [profile, setProfile] = useState({
    fullname: "",
    bio: "",
    location: "",
    profilePic: null,
    profilePicPreview: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  const [isDirty, setIsDirty] = useState({
    fullname: false,
    bio: false,
    location: false,
    profilePic: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
    onConfirm: null,
  });

  const validateField = useCallback((field, value) => {
    let error = "";

    switch (field) {
      case "fullname":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2)
          error = "Full name must be at least 2 characters";
        else if (value.length > 50)
          error = "Full name must be less than 50 characters";
        break;
      case "bio":
        if (value.length > 500) error = "Bio must be less than 500 characters";
        break;
    }

    return error;
  }, []);

  const isFieldValid = useCallback(
    (field) => {
      const value = profile[field];
      return !validateField(field, value);
    },
    [profile, validateField]
  );

  const handleChange = useCallback(
    (e, field) => {
      const value = e.target.value;

      setProfile((prev) => ({ ...prev, [field]: value }));
      setIsDirty((prev) => ({ ...prev, [field]: true }));

      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField]
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Please upload a valid image",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Image size must be less than 5MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profilePic: file,
        profilePicPreview: reader.result,
      }));
      setIsDirty((prev) => ({ ...prev, profilePic: true }));
      setErrors((prev) => ({ ...prev, profilePic: "" }));
    };
    reader.readAsDataURL(file);
  }, []);

  const saveAllChanges = useCallback(async () => {
    setIsLoading(true);
    try {
      const dirtyFields = Object.keys(isDirty).filter(
        (key) => isDirty[key] && key !== "profilePic" && key !== "location"
      );

      if (dirtyFields.length === 0) {
        console.log("No changes to save");
        return { success: false, message: "No changes to save" };
      }

      const validationErrors = {};
      dirtyFields.forEach((field) => {
        const error = validateField(field, profile[field]);
        if (error) validationErrors[field] = error;
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...validationErrors }));
        return {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        };
      }

      const updateData = {};
      dirtyFields.forEach((field) => {
        updateData[field] = profile[field];
      });

      console.log("Saving profile data to API:", updateData);
      const response = await patchSettings(updateData);

      const updatedDirty = { ...isDirty };
      dirtyFields.forEach((field) => {
        updatedDirty[field] = false;
      });
      setIsDirty(updatedDirty);

      return { success: true, data: response };
    } catch (error) {
      console.error("Failed to save profile:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to save changes",
      };
    } finally {
      setIsLoading(false);
    }
  }, [profile, isDirty, validateField]);

  const handleSaveAll = useCallback(() => {
    const dirtyFields = Object.keys(isDirty).filter(
      (key) => isDirty[key] && key !== "profilePic"
    );

    if (dirtyFields.length === 0) {
      console.log("No changes to save");
      return;
    }

    const fieldDisplayNames = {
      fullname: "full name",
      bio: "bio",
      location: "location",
    };

    const displayText = dirtyFields
      .map((field) => fieldDisplayNames[field] || field)
      .join(", ");

    setPopupContent({
      title: "Save All Changes",
      description: `Are you sure you want to save changes to: ${displayText}?`,
      actionType: "confirm",
      onConfirm: async () => {
        const result = await saveAllChanges();
        if (result.success) {
          console.log("Profile saved successfully:", result.data);
        } else {
          console.error("Failed to save profile:", result.message);
        }
        setPopupOpen(false);
      },
    });
    setPopupOpen(true);
  }, [isDirty, saveAllChanges]);

  const handleSavePicture = useCallback(() => {
    if (!isDirty.profilePic) {
      console.log("No profile picture changes to save");
      return;
    }

    setPopupContent({
      title: "Save Profile Picture",
      description: "Are you sure you want to update your profile picture?",
      actionType: "confirm",
      onConfirm: async () => {
        console.log("Saving profile picture...");
        setPopupOpen(false);
      },
    });
    setPopupOpen(true);
  }, [isDirty.profilePic]);

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const settings = await getSettings();

      if (settings) {
        setProfile((prev) => ({
          ...prev,
          fullname: settings.fullname || "",
          bio: settings.bio || "",
          location: settings.location || "",
        }));
      }
    } catch (error) {
      console.error("Failed to load profile settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const anyTextDirty = Object.keys(isDirty).some(
    (key) => isDirty[key] && key !== "profilePic"
  );

  return {
    profile,
    errors,
    isDirty,
    isLoading,
    popupOpen,
    popupContent,
    anyDirty: anyTextDirty,

    setPopupOpen,
    handleChange,
    handleImageChange,
    handleSaveAll,
    handleSavePicture,
    loadInitialData,

    saveAllChanges,
  };
}
