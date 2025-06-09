import { useState } from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      >
      </div>
      <div className={`relative bg-[var(--main-color)] rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        {children}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--g-color)] hover:text-[var(--w-color)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default function AccountSettings() {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({
        title: '',
        description: ''
    });

    const handleButtonClick = (title, description) => {
        setPopupContent({ title, description });
        setPopupOpen(true);
    };

    return(
        <div className="px-8 pt-4 flex flex-col">

            {/* popup component */}
            <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
                <h2 className="text-2xl font-bold text-white mb-4">{popupContent.title}</h2>
                <p className="text-[var(--g-color)] mb-6">{popupContent.description}</p>

                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={() => setPopupOpen(false)}
                        className="px-4 py-2 rounded border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)]"
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 rounded bg-[var(--secondary-color)] text-white hover:bg-[var(--main-color-hover)] border border-[var(--g-color)]"
                    >
                        Confirm
                    </button>
                </div>
            </Popup>

            {/* username */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Change your username</h1>
                <div className="flex items-center justify-center py-2  w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                <p className="text-[var(--g-color)]">Please click the button to change your username, note that once you change your username you'll have to login with your new username next time you neet to login.</p>

                <button 
                 className="mt-5 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)]"
                 onClick={() => handleButtonClick(
                    "Change Username", 
                    "Are you sure you want to change your username? You'll need to use the new username to log in next time."
                )}>
                    Change username
                </button>

            </div>


            {/* email */}
            <div className="flex flex-col pt-16">
                <h1 className="text-white font-medium text-3xl">Change your email</h1>

            <div className="flex items-center justify-center py-2  w-4/5 pb-4">
                <div className="border-t border-[var(--g-color)] w-full"></div>
            </div>
                <p className="text-[var(--g-color)]">Please click the button to change your email, note that we will contact you via this new email adress. </p>
                
                <button 
                 className="mt-5 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)]"
                 onClick={() => handleButtonClick(
                    "Change Email", 
                    "We'll send a verification link to your new email address. Are you sure you want to proceed?"
                )}
                 >
                    Change email
                
                </button>
            </div>

            {/* delete your account */}

            <div className="flex flex-col pt-16">
                <h1 className="text-[var(--r-color)] font-medium text-3xl">Delete your account</h1>

            <div className="flex items-center justify-center py-2  w-4/5 pb-4">
                <div className="border-t border-[var(--g-color)] w-full"></div>
            </div>

                <p className="text-[var(--g-color)]">Please click the button to delete your account, note that you can't restore your account after deletion.</p>
                
                <button 
                 className="mt-5 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--r-color)] hover:text-white"
                 onClick={() => handleButtonClick(
                    "Delete Account", 
                    "This action cannot be undone. All your data will be permanently erased. Are you absolutely sure?"
                )}
                 >
                    Delete account
                </button>
                
            </div>
        </div>
    )
}