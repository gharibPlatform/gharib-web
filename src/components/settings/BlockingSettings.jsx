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

export default function BlockingSettings() {
    const [searchInput, setSearchInput] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [blockedUsers, setBlockedUsers] = useState([
        { id: 1, username: 'toxic_malek23', avatar: '', blockedDate: '2023-05-15' },
        { id: 2, username: 'spam_bot', avatar: '', blockedDate: '2023-06-20' }
    ]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleBlockUser = () => {
        if (userToBlock) {
            if (!blockedUsers.some(user => user.username === userToBlock)) {
                setBlockedUsers([
                    ...blockedUsers,
                    {
                        id: Date.now(), 
                        username: userToBlock,
                        avatar: '',
                        blockedDate: new Date().toISOString().split('T')[0]
                    }
                ]);
            }
            setPopupOpen(false);
            setUserToBlock(null);
        }
    };

    const handleUnblockUser = (userId) => {
        setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    };

    return (
        <div className="px-8 pt-4 flex flex-col">
            {/* search and block section */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Block Users</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Search for user to block</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Enter username to find and block a user
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearch}
                            placeholder="Enter username..."
                            className="w-min flex-1 bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)]"
                        />
                        <button
                            onClick={() => {
                                if (searchInput.trim()) {
                                    setUserToBlock(searchInput.trim());
                                    setPopupOpen(true);
                                }
                            }}
                            disabled={!searchInput.trim()}
                            className="w-min px-4 py-2 bg-[var(--r-color)] text-white rounded border border-[var(--r-color)] hover:bg-[var(--bright-r-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Block
                        </button>
                    </div>
                </div>
            </div>

            {/* Blocked users list */}
            <div className="flex flex-col">
                <h2 className="text-white text-xl font-medium mb-4">Blocked Users ({blockedUsers.length})</h2>
                
                {blockedUsers.length > 0 ? (
                    <div className="bg-[var(--main-color-darker)] rounded-lg border border-[var(--g-color)] divide-y divide-[var(--g-color)] w-9/12" >
                        {blockedUsers.map(user => (
                            <div key={user.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[var(--g-color)] flex items-center justify-center text-white">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
                                        ) : (
                                            user.username.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{user.username}</p>
                                        <p className="text-[var(--g-color)] text-sm">Blocked on {user.blockedDate}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUnblockUser(user.id)}
                                    className="px-3 py-1 text-[var(--w-color)] border border-[var(--g-color)] rounded hover:bg-[var(--g-color)] transition-colors"
                                >
                                    Unblock
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[var(--g-color)]">You haven't blocked any users yet.</p>
                )}
            </div>

            {/* Block confirmation popup */}
            <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} actionType="delete">
                <h2 className="text-2xl font-bold text-white mb-4">Block {userToBlock}?</h2>
                <p className="text-[var(--g-color)] mb-6">
                    Are you sure you want to block {userToBlock}? You won't see their messages or content anymore.
                </p>

                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={() => setPopupOpen(false)}
                        className="px-4 py-2 rounded border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)] transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleBlockUser}
                        className="px-4 py-2 rounded text-white bg-[var(--r-color)] border border-[var(--r-color)] hover:bg-[var(--bright-r-color)] hover:border-[var(--r-color-dark)] transition-colors"
                    >
                        Block User
                    </button>
                </div>
            </Popup>
        </div>
    );
}