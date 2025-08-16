import { ConfirmationPopup } from "../common/ConfirmationPopup";
import {
  ChangeUsernameSection,
  ChangeEmailSection,
  DeleteAccountSection,
} from "./Sections";
import { useAccountSettings } from "../../../hooks/settings/useAccountSettings";

export default function AccountSettings() {
  const {
    popupOpen,
    popupContent,
    username,
    email,
    isDirty,
    errors,
    setPopupOpen,
    handleChange,
    handleButtonClick,
  } = useAccountSettings();

  return (
    <div className="px-8 pt-4 flex flex-col">
      <ConfirmationPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupContent.title}
        description={popupContent.description}
        actionType={popupContent.actionType}
      />

      <ChangeUsernameSection
        username={username}
        error={errors.username}
        isDirty={isDirty.username}
        onUsernameChange={(e) => handleChange(e, "username")}
        onButtonClick={handleButtonClick}
      />

      <ChangeEmailSection
        email={email}
        error={errors.email}
        isDirty={isDirty.email}
        onEmailChange={(e) => handleChange(e, "email")}
        onButtonClick={handleButtonClick}
      />

      <DeleteAccountSection onButtonClick={handleButtonClick} />
    </div>
  );
}
