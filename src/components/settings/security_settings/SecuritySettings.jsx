import { ConfirmationPopup } from "../common/ConfirmationPopup";
import { FormInput } from "../../common/input/FormInput";
import { useSecuritySettings } from "../../../hooks/settings/useSecuritySettings";
import { ActionButton } from "../../common/buttons/ActionButton";

export default function SecuritySettings() {
  const {
    popupOpen,
    setPopupOpen,
    passwords,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    isFormValid,
  } = useSecuritySettings();

  return (
    <div className="px-8 pt-4 flex flex-col gap-6">
      <ConfirmationPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Change Password"
        description="Are you sure you want to change your password? You'll need to use your new password for your next login."
        actionType="confirm"
      />

      {/* Password Change Form */}
      <div className="flex flex-col pt-4">
        <h1 className="text-white font-medium text-3xl">Change Password</h1>
        <div className="flex items-center justify-center py-2 w-4/5 pb-4">
          <div className="border-t border-[var(--g-color)] w-full"></div>
        </div>

        <FormInput
          id="oldPassword"
          label="Current Password"
          value={passwords.oldPassword}
          onChange={(e) => handleChange(e, "oldPassword")}
          error={errors.oldPassword}
          isDirty={isDirty.oldPassword}
          type="password"
          placeholder="Enter current password"
        />

        <FormInput
          id="newPassword"
          label="New Password"
          value={passwords.newPassword}
          onChange={(e) => handleChange(e, "newPassword")}
          error={errors.newPassword}
          isDirty={isDirty.newPassword}
          type="password"
          placeholder="Enter new password (min 8 chars)"
        />

        <FormInput
          id="confirmPassword"
          label="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={(e) => handleChange(e, "confirmPassword")}
          error={errors.confirmPassword}
          isDirty={isDirty.confirmPassword}
          type="password"
          placeholder="Confirm new password"
        />

        <div className="flex gap-4 items-center pt-2">
          <ActionButton
            label="Change Password"
            value="password-form"
            error={false}
            isDirty={isFormValid()}
            onClick={handleSubmit}
          />

          <div
            className="text-[var(--b-color)] text-lg pt-2 hover:underline cursor-pointer"
            onClick={() => alert("Redirect to password recovery flow")}
          >
            I forgot my password
          </div>
        </div>
      </div>
    </div>
  );
}
