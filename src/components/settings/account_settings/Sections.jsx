import { FormInput } from "../../common/input/FormInput";
import { SectionHeader } from "../common/SectionHeader";
import { ActionButton } from "../../common/buttons/ActionButton";

export function ChangeUsernameSection({
  username,
  error,
  isDirty,
  onUsernameChange,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col pt-4">
      <SectionHeader title="Change your username" />

      <FormInput
        id="username"
        label="New Username"
        value={username}
        onChange={onUsernameChange}
        error={error}
        isDirty={isDirty}
        placeholder="Enter new username"
      />

      <ActionButton
        label="Change Username"
        value={username}
        error={error}
        isDirty={isDirty}
        onClick={() =>
          onButtonClick(
            "Change Username",
            "Are you sure you want to change your username? You'll need to use the new username to log in next time."
          )
        }
      />
    </div>
  );
}

export function ChangeEmailSection({
  email,
  error,
  isDirty,
  onEmailChange,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col pt-16">
      <SectionHeader title="Change your email" />

      <FormInput
        id="email"
        label="New Email"
        value={email}
        onChange={onEmailChange}
        error={error}
        isDirty={isDirty}
        type="email"
        placeholder="Enter new email"
      />

      <ActionButton
        label="Change Email"
        value={email}
        error={error}
        isDirty={isDirty}
        onClick={() =>
          onButtonClick(
            "Change Email",
            "We'll send a verification link to your new email address. Are you sure you want to proceed?"
          )
        }
      />
    </div>
  );
}

export function DeleteAccountSection({ onButtonClick }) {
  return (
    <div className="flex flex-col pt-16">
      <SectionHeader title="Delete your account" color="[var(--r-color)]" />

      <p className="text-[var(--g-color)]">
        Please click the button to delete your account, note that you can't
        restore your account after deletion.
      </p>

      <ActionButton
        label="Delete Account"
        destructive
        value="confirmed"
        isDirty={true}
        onClick={() =>
          onButtonClick(
            "Delete Account",
            "This action cannot be undone. All your data will be permanently erased. Are you absolutely sure?",
            "delete"
          )
        }
      />
    </div>
  );
}
