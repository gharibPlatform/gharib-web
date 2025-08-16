import { FormInput } from "../common/FormInput";
import { SectionHeader } from "../common/SectionHeader";

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

      <button
        className={`mt-2 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)] ${
          !username || error ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          onButtonClick(
            "Change Username",
            "Are you sure you want to change your username? You'll need to use the new username to log in next time."
          )
        }
        disabled={!username || !!error}
      >
        Change username
      </button>
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

      <button
        className={`mt-2 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)] ${
          !email || error ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          onButtonClick(
            "Change Email",
            "We'll send a verification link to your new email address. Are you sure you want to proceed?"
          )
        }
        disabled={!email || !!error}
      >
        Change email
      </button>
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

      <button
        className="mt-5 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--r-color)] hover:text-white"
        onClick={() =>
          onButtonClick(
            "Delete Account",
            "This action cannot be undone. All your data will be permanently erased. Are you absolutely sure?",
            "delete"
          )
        }
      >
        Delete account
      </button>
    </div>
  );
}
