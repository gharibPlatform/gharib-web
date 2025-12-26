import { useState } from "react";
import { UserPlus } from "lucide-react";
import AddBrotherRequest, {
  SuccessModal,
  ErrorModal,
} from "./AddBrotherRequest";
import KhatmasListingHome from "./KhatmasListingHome";
import { sendBrotherRequest } from "../../utils/notifications";

export default function Home({ khatmas }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successUsername, setSuccessUsername] = useState("");
  const [pendingRetry, setPendingRetry] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddBrother = async (username) => {
    try {
      await sendBrotherRequest(username);
      setSuccessUsername(username);
      setShowSuccess(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending brother request:", error);

      let errorMsg = "Failed to send friend request";
      if (error.response?.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setPendingRetry(username);
      setShowError(true);
      setIsOpen(false);
    }
  };

  const handleRetry = () => {
    setShowError(false);
    if (pendingRetry) {
      handleAddBrother(pendingRetry);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <UserPlus size={24} />
      </button>

      {isOpen && (
        <AddBrotherRequest
          onClose={handleClose}
          onAddBrother={handleAddBrother}
        />
      )}

      {showSuccess && (
        <SuccessModal
          username={successUsername}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <ErrorModal
          error={errorMessage}
          onClose={() => setShowError(false)}
          onRetry={handleRetry}
        />
      )}

      <KhatmasListingHome khatmas={khatmas} />
    </div>
  );
}
