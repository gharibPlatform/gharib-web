import { useState, useCallback } from "react";
import { patchSettings, getSettings } from "../../utils/apiSettings";
import { updateUserDataPatch } from "../../utils/userAuth";

export function useAccountSettings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [isDirty, setIsDirty] = useState({
    username: false,
    email: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
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
      case "username":
        if (!value) error = "Username is required";
        else if (!/^[a-zA-Z0-9_]{3,20}$/.test(value))
          error = "3-20 chars, letters, numbers, underscores";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email";
        break;
    }

    return error;
  }, []);

  const isFieldValid = useCallback(
    (field) => {
      const value = formData[field];

      switch (field) {
        case "username":
          return /^[a-zA-Z0-9_]{3,20}$/.test(value);
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        default:
          return false;
      }
    },
    [formData]
  );

  const handleChange = useCallback(
    (e, field) => {
      const value = e.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));
      setIsDirty((prev) => ({ ...prev, [field]: true }));

      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField]
  );

  const api = {
    updateUsername: async (newUsername) => {
      try {
        const response = await updateUserDataPatch({ username: newUsername });
        return { success: true, data: response };
      } catch (error) {
        console.error("Failed to update username:", error);
        throw error;
      }
    },

    updateEmail: async (newEmail) => {
      try {
        const response = await patchSettings({ email: newEmail });
        return { success: true, data: response };
      } catch (error) {
        console.error("Failed to update email:", error);
        throw error;
      }
    },

    deleteAccount: async () => {
      try {
        console.log("Deleting account - implement proper endpoint");
        return { success: true };
      } catch (error) {
        console.error("Failed to delete account:", error);
        throw error;
      }
    },
  };

  const handleButtonClick = useCallback(
    (action, field = null) => {
      const actions = {
        changeUsername: {
          title: "Change Username",
          description: "Are you sure you want to change your username?",
          validate: () => isFieldValid("username"),
          getData: () => formData.username,
          apiCall: api.updateUsername,
        },
        changeEmail: {
          title: "Change Email",
          description: "Are you sure you want to change your email?",
          validate: () => isFieldValid("email"),
          getData: () => formData.email,
          apiCall: api.updateEmail,
        },
        deleteAccount: {
          title: "Delete Account",
          description:
            "This action cannot be undone. All your data will be permanently deleted.",
          getData: () => null,
          apiCall: api.deleteAccount,
        },
      };

      const config = actions[action];

      if (!config) {
        console.error("Unknown action:", action);
        return;
      }

      // Validate if needed
      if (field && !isFieldValid(field)) {
        setIsDirty((prev) => ({ ...prev, [field]: true }));
        const error = validateField(field, formData[field]);
        setErrors((prev) => ({ ...prev, [field]: error }));
        return;
      }

      const onConfirm = async () => {
        setIsLoading(true);
        try {
          const data = config.getData();
          const result = await config.apiCall(data);

          if (result.success) {
            // Reset form state if successful
            if (action === "changeUsername") {
              setFormData((prev) => ({ ...prev, username: "" }));
              setIsDirty((prev) => ({ ...prev, username: false }));
            } else if (action === "changeEmail") {
              setFormData((prev) => ({ ...prev, email: "" }));
              setIsDirty((prev) => ({ ...prev, email: false }));
            }
            console.log(`${action} successful!`, result.data);

            // Optionally fetch updated settings
            try {
              const updatedSettings = await getSettings();
              console.log("Updated settings:", updatedSettings);
            } catch (fetchError) {
              console.error("Failed to fetch updated settings:", fetchError);
            }
          } else {
            console.error(`${action} failed:`, result.error);
          }
        } catch (error) {
          console.error(`${action} error:`, error);
        } finally {
          setIsLoading(false);
          setPopupOpen(false);
        }
      };

      setPopupContent({
        title: config.title,
        description: config.description,
        actionType: action === "deleteAccount" ? "delete" : "confirm",
        onConfirm,
      });
      setPopupOpen(true);
    },
    [formData, isFieldValid, validateField]
  );

  const handleUsernameChange = useCallback(() => {
    handleButtonClick("changeUsername", "username");
  }, [handleButtonClick]);

  const handleEmailChange = useCallback(() => {
    handleButtonClick("changeEmail", "email");
  }, [handleButtonClick]);

  const handleDeleteAccount = useCallback(() => {
    handleButtonClick("deleteAccount");
  }, [handleButtonClick]);

  // Optional: Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const settings = await getSettings();

      // Assuming settings contains username and email
      if (settings) {
        setFormData({
          username: settings.username || "",
          email: settings.email || "",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    popupOpen,
    popupContent,
    username: formData.username,
    email: formData.email,
    isDirty,
    errors,
    isLoading,

    setPopupOpen,
    handleChange,
    handleButtonClick,

    handleUsernameChange,
    handleEmailChange,
    handleDeleteAccount,
    loadInitialData,

    getFormData: () => formData,
    isFormValid: () => isFieldValid("username") && isFieldValid("email"),
  };
}
