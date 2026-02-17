import { useState } from "react";
import CreateDMConfirmation from "./CreateDMConfirmation";
import { FiX, FiCheck } from "react-icons/fi";

export default function CreateDM({ close }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      close(); // Close the modal after success
    }, 2000);
  };

  return (
    <div className="relative w-[90vw] max-w-2xl h-auto min-h-[400px] bg-[var(--main-color)] rounded-lg overflow-hidden border border-[var(--g-color)] border-opacity-30">
      {isSuccess ? (
        <div className="bg-[var(--main-color)] h-full flex flex-col items-center justify-center text-center p-6 min-h-[400px]">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <FiCheck className="text-green-500" size={32} />
          </div>
          <h2 className="text-[var(--w-color)] text-2xl font-semibold mb-2">
            DM Created Successfully!
          </h2>
          <p className="text-[var(--g-color)]">
            Your direct message group has been created.
          </p>
        </div>
      ) : (
        <div className="bg-[var(--main-color)] h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-[var(--g-color)] border-opacity-30">
            <h2 className="text-[var(--w-color)] text-2xl font-semibold">
              Create Direct Message
            </h2>
            <button
              onClick={close}
              className="text-[var(--g-color)] hover:text-[var(--w-color)] p-2 rounded-full hover:bg-[var(--main-color-hover)] transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          <CreateDMConfirmation onSuccess={handleSuccess} />
        </div>
      )}
    </div>
  );
}
