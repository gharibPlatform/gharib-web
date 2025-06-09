import { useState, useEffect } from 'react';

const Popup = ({ isOpen, onClose, children, actionType = 'confirm' }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
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
        description: '',
        actionType: 'confirm'
    });

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isDirty, setIsDirty] = useState({
        username: false,
        email: false
    });
    const [errors, setErrors] = useState({
        username: '',
        email: ''
    });

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    // Check if form is valid
    const isFormValid = (field) => {
        if (field === 'username') {
            return usernameRegex.test(username);
        }
        if (field === 'email') {
            return emailRegex.test(email);
        }
        return false;
    };

    // Handle field changes
    const handleChange = (e, field) => {
        const value = e.target.value;
        if (field === 'username') {
            setUsername(value);
            setIsDirty(prev => ({...prev, username: true}));
        } else {
            setEmail(value);
            setIsDirty(prev => ({...prev, email: true}));
        }
        
        validateField(field, value);
    };

    // Field validation
    const validateField = (field, value) => {
        let error = '';
        
        if (field === 'username') {
            if (!value) error = 'Username is required';
            else if (!usernameRegex.test(value)) error = '3-20 chars, letters, numbers, underscores';
        } else if (field === 'email') {
            if (!value) error = 'Email is required';
            else if (!emailRegex.test(value)) error = 'Please enter a valid email';
        }
        
        setErrors(prev => ({...prev, [field]: error}));
    };

    const handleButtonClick = (title, description, actionType = 'confirm') => {
        // Only proceed if form is valid for username/email changes
        if (actionType === 'confirm' && title.includes('Change')) {
            const field = title.includes('Username') ? 'username' : 'email';
            if (!isFormValid(field)) {
                setIsDirty(prev => ({...prev, [field]: true}));
                validateField(field, field === 'username' ? username : email);
                return;
            }
        }
        
        setPopupContent({ title, description, actionType });
        setPopupOpen(true);
    };

    return(
        <div className="px-8 pt-4 flex flex-col">
            {/* Popup section */}
            <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} actionType={popupContent.actionType}>
                <h2 className="text-2xl font-bold text-white mb-4">{popupContent.title}</h2>
                <p className="text-[var(--g-color)] mb-6">{popupContent.description}</p>

                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={() => setPopupOpen(false)}
                        className="px-4 py-2 rounded border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)] transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        className={`px-4 py-2 rounded text-white border transition-colors ${
                            popupContent.actionType === 'delete' 
                                ? 'bg-[var(--r-color)] border-[var(--r-color)] hover:bg-[var(--bright-r-color)] hover:border-[var(--r-color-dark)]' 
                                : 'bg-[var(--main-color-hover-darker)] border-[var(--g-color)] hover:bg-[var(--main-color-hover)]'
                        }`}
                    >
                        {popupContent.actionType === 'delete' ? 'Delete Forever' : 'Confirm'}
                    </button>
                </div>
            </Popup>

            {/* Username section */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Change your username</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="username" className="block text-[var(--g-color)] mb-2">New Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => handleChange(e, 'username')}
                        className={`w-72 bg-[var(--bg-color)] border ${errors.username && isDirty.username ? 'border-[var(--r-color)]' : 'border-[var(--g-color)]'} rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
                        placeholder="Enter new username"
                    />
                    {isDirty.username && errors.username && (
                        <p className="text-[var(--r-color)] text-sm mt-1">{errors.username}</p>
                    )}
                </div>
                
                <button 
                    className={`mt-2 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)] ${(!username || errors.username) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleButtonClick(
                        "Change Username", 
                        "Are you sure you want to change your username? You'll need to use the new username to log in next time."
                    )}
                    disabled={!username || !!errors.username}
                >
                    Change username
                </button>
            </div>

            {/* Email Section */}
            <div className="flex flex-col pt-16">
                <h1 className="text-white font-medium text-3xl">Change your email</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[var(--g-color)] mb-2">New Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleChange(e, 'email')}
                        className={`w-72 bg-[var(--bg-color)] border ${errors.email && isDirty.email ? 'border-[var(--r-color)]' : 'border-[var(--g-color)]'} rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
                        placeholder="Enter new email"
                    />
                    {isDirty.email && errors.email && (
                        <p className="text-[var(--r-color)] text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                
                <button 
                    className={`mt-2 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)] ${(!email || errors.email) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleButtonClick(
                        "Change Email", 
                        "We'll send a verification link to your new email address. Are you sure you want to proceed?"
                    )}
                    disabled={!email || !!errors.email}
                >
                    Change email
                </button>
            </div>

            {/* Delete your account  */}
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
                    "This action cannot be undone. All your data will be permanently erased. Are you absolutely sure?",
                    "delete"
                )}
                 >
                    Delete account
                </button>
                
            </div>
        </div>
    )
}