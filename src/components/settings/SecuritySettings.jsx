import { useState } from 'react';

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

export default function SecuritySettings() {
    const [popupOpen, setPopupOpen] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isDirty, setIsDirty] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e, field) => {
        const value = e.target.value;
        setPasswords(prev => ({...prev, [field]: value}));
        setIsDirty(prev => ({...prev, [field]: true}));
        validateField(field, value);
    };

    const validateField = (field, value) => {
        let error = '';
        
        if (field === 'oldPassword') {
            if (!value) error = 'Current password is required';
        } else if (field === 'newPassword') {
            if (!value) error = 'New password is required';
            else if (value.length < 8) error = 'Password must be at least 8 characters';
        } else if (field === 'confirmPassword') {
            if (!value) error = 'Please confirm your password';
            else if (value !== passwords.newPassword) error = 'Passwords do not match';
        }
        
        setErrors(prev => ({...prev, [field]: error}));
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
            // Mark all fields as dirty to show errors
            setIsDirty({
                oldPassword: true,
                newPassword: true,
                confirmPassword: true
            });
            validateField('newPassword', passwords.newPassword);
            validateField('confirmPassword', passwords.confirmPassword);
            return;
        }
        setPopupOpen(true);
    };

    return (
        <div className="px-8 pt-4 flex flex-col">
            {/* Popup */}
            <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
                <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
                <p className="text-[var(--g-color)] mb-6">Are you sure you want to change your password? You'll need to use your new password for your next login.</p>
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={() => setPopupOpen(false)}
                        className="px-4 py-2 rounded border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)] transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 rounded bg-[var(--main-color-hover-darker)] text-white border border-[var(--g-color)] hover:bg-[var(--main-color-hover)] transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </Popup>

            {/* Password Change Form */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Change Password</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-[var(--g-color)] mb-2">Current Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={passwords.oldPassword}
                        onChange={(e) => handleChange(e, 'oldPassword')}
                        className={`w-72 bg-[var(--bg-color)] border ${errors.oldPassword && isDirty.oldPassword ? 'border-[var(--r-color)]' : 'border-[var(--g-color)]'} rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
                        placeholder="Enter current password"
                    />
                    {isDirty.oldPassword && errors.oldPassword && (
                        <p className="text-[var(--r-color)] text-sm mt-1">{errors.oldPassword}</p>
                    )}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-[var(--g-color)] mb-2">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={passwords.newPassword}
                        onChange={(e) => handleChange(e, 'newPassword')}
                        className={`w-72 bg-[var(--bg-color)] border ${errors.newPassword && isDirty.newPassword ? 'border-[var(--r-color)]' : 'border-[var(--g-color)]'} rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
                        placeholder="Enter new password (min 8 chars)"
                    />
                    {isDirty.newPassword && errors.newPassword && (
                        <p className="text-[var(--r-color)] text-sm mt-1">{errors.newPassword}</p>
                    )}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-[var(--g-color)] mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                        className={`w-72 bg-[var(--bg-color)] border ${errors.confirmPassword && isDirty.confirmPassword ? 'border-[var(--r-color)]' : 'border-[var(--g-color)]'} rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
                        placeholder="Confirm new password"
                    />
                    {isDirty.confirmPassword && errors.confirmPassword && (
                        <p className="text-[var(--r-color)] text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                </div>
                
                <div className='flex gap-4 items-center'>
                    <button
                        className={`mt-2 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap hover:bg-[var(--main-color-hover)] ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Change Password
                    </button>

                    <div className='text-[var(--b-color)] text-lg pt-2 hover:underline cursor-pointer'>I forgot my password</div>
                </div>
            </div>
        </div>
    );
}