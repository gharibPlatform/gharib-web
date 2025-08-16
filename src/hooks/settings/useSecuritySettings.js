import { useState } from "react";

export function useSecuritySettings() {
  const [popupOpen, setPopupOpen] = useState(false);
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

  const handleChange = (e, field) => {
    const value = e.target.value;
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setIsDirty((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = "";

    if (field === "oldPassword") {
      if (!value) error = "Current password is required";
    } else if (field === "newPassword") {
      if (!value) error = "New password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
    } else if (field === "confirmPassword") {
      if (!value) error = "Please confirm your password";
      else if (value !== passwords.newPassword)
        error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
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
    if (!isFormValid()) {
      setIsDirty({
        oldPassword: true,
        newPassword: true,
        confirmPassword: true,
      });
      validateField("newPassword", passwords.newPassword);
      validateField("confirmPassword", passwords.confirmPassword);
      return;
    }
    setPopupOpen(true);
  };

  return {
    popupOpen,
    setPopupOpen,
    passwords,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    isFormValid,
  };
}
