import { useState } from "react";

export function useAccountSettings() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isDirty, setIsDirty] = useState({ username: false, email: false });
  const [errors, setErrors] = useState({ username: "", email: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  const isFormValid = (field) => {
    if (field === "username") return usernameRegex.test(username);
    if (field === "email") return emailRegex.test(email);
    return false;
  };

  const validateField = (field, value) => {
    let error = "";

    if (field === "username") {
      if (!value) error = "Username is required";
      else if (!usernameRegex.test(value))
        error = "3-20 chars, letters, numbers, underscores";
    } else if (field === "email") {
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Please enter a valid email";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === "username") {
      setUsername(value);
      setIsDirty((prev) => ({ ...prev, username: true }));
    } else {
      setEmail(value);
      setIsDirty((prev) => ({ ...prev, email: true }));
    }

    validateField(field, value);
  };

  const handleButtonClick = (title, description, actionType = "confirm") => {
    if (actionType === "confirm" && title.includes("Change")) {
      const field = title.includes("Username") ? "username" : "email";
      if (!isFormValid(field)) {
        setIsDirty((prev) => ({ ...prev, [field]: true }));
        validateField(field, field === "username" ? username : email);
        return;
      }
    }
    setPopupContent({ title, description, actionType });
    setPopupOpen(true);
  };

  return {
    popupOpen,
    popupContent,
    username,
    email,
    isDirty,
    errors,
    setPopupOpen,
    handleChange,
    handleButtonClick,
  };
}
