import { useState, useCallback } from "react";
import { changePassword } from "../../utils/userAuth";

export function useSecuritySettings() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
    onConfirm: null,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isDirty, setIsDirty] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateField = (field, value, allPasswords) => {
    let error = "";

    if (field === "oldPassword") {
      if (!value) error = "Current password is required";
    } else if (field === "newPassword") {
      if (!value) error = "New password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
    } else if (field === "confirmPassword") {
      if (!value) error = "Please confirm your password";
      else if (value !== allPasswords.newPassword)
        error = "Passwords do not match";
    }

    return error;
  };

  const handleChange = (e, field) => {
    const value = e.target.value;

    const updatedPasswords = { ...passwords, [field]: value };
    setPasswords(updatedPasswords);

    setIsDirty((prev) => ({ ...prev, [field]: true }));
    setApiError("");

    const error = validateField(field, value, updatedPasswords);
    setErrors((prev) => ({ ...prev, [field]: error }));

    if (field === "newPassword") {
      const confirmError = validateField(
        "confirmPassword",
        updatedPasswords.confirmPassword,
        updatedPasswords
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const isFormValid = () => {
    return (
      passwords.oldPassword &&
      passwords.newPassword &&
      passwords.confirmPassword &&
      passwords.newPassword === passwords.confirmPassword &&
      passwords.newPassword.length >= 8 &&
      !errors.oldPassword &&
      !errors.newPassword &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = () => {
    setIsDirty({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    const newErrors = {
      oldPassword: validateField(
        "oldPassword",
        passwords.oldPassword,
        passwords
      ),
      newPassword: validateField(
        "newPassword",
        passwords.newPassword,
        passwords
      ),
      confirmPassword: validateField(
        "confirmPassword",
        passwords.confirmPassword,
        passwords
      ),
    };

    setErrors(newErrors);

    const isValid = isFormValid();

    if (!isValid) {
      console.log("Validation failed:", {
        passwords,
        errors: newErrors,
        match: passwords.newPassword === passwords.confirmPassword,
      });
      return;
    }

    setPopupContent({
      title: "Change Password",
      description:
        "Are you sure you want to change your password? You'll need to use your new password for your next login.",
      actionType: "confirm",
      onConfirm: async () => {
        try {
          setIsLoading(true);
          setApiError("");

          const response = await changePassword({
            old_password: passwords.oldPassword,
            new_password1: passwords.newPassword,
            new_password2: passwords.newPassword,
          });

          console.log("Password changed successfully:", response);

          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });

          setIsDirty({
            oldPassword: false,
            newPassword: false,
            confirmPassword: false,
          });

          setErrors({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } catch (error) {
          console.error("Failed to change password:", error);
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to change password. Please try again.";
          setApiError(errorMessage);
        } finally {
          setIsLoading(false);
          setPopupOpen(false);
        }
      },
    });

    setPopupOpen(true);
  };

  const resetForm = () => {
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsDirty({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setApiError("");
  };

  return {
    popupOpen,
    popupContent,
    passwords,
    errors,
    isDirty,
    isLoading,
    apiError,
    setPopupOpen,
    handleChange,
    handleSubmit,
    resetForm,
    isFormValid: isFormValid(),
  };
}
