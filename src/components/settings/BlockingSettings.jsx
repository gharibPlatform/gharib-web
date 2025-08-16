import { useState } from "react";
import { ConfirmationPopup } from "./common/ConfirmationPopup";
import { ActionButton } from "../common/buttons/ActionButton";

export default function BlockingSettings() {
  const [searchInput, setSearchInput] = useState("");
  const [blockPopupOpen, setBlockPopupOpen] = useState(false);
  const [unblockPopupOpen, setUnblockPopupOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [userToUnblock, setUserToUnblock] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, username: "toxic_malek23", avatar: "", blockedDate: "2023-05-15" },
    { id: 2, username: "spam_bot", avatar: "", blockedDate: "2023-06-20" },
  ]);

  const handleSearch = (e) => setSearchInput(e.target.value);

  const handleBlockUser = () => {
    if (userToBlock) {
      if (!blockedUsers.some((user) => user.username === userToBlock)) {
        setBlockedUsers([
          ...blockedUsers,
          {
            id: Date.now(),
            username: userToBlock,
            avatar: "",
            blockedDate: new Date().toISOString().split("T")[0],
          },
        ]);
      }
      setBlockPopupOpen(false);
      setUserToBlock(null);
      setSearchInput("");
    }
  };

  const handleUnblockUser = () => {
    if (userToUnblock) {
      setBlockedUsers(
        blockedUsers.filter((user) => user.id !== userToUnblock.id)
      );
      setUnblockPopupOpen(false);
      setUserToUnblock(null);
    }
  };

  return (
    <div className="px-8 pt-4 flex flex-col gap-8">
      {/* Search & Block Section */}
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

            <ActionButton
              label="Block"
              value={searchInput}
              isDirty={!!searchInput.trim()}
              error={false}
              onClick={() => {
                setUserToBlock(searchInput.trim());
                setBlockPopupOpen(true);
              }}
              destructive
            />
          </div>
        </div>
      </div>

      {/* Blocked Users List */}
      <div className="flex flex-col">
        <h2 className="text-white text-xl font-medium mb-4">
          Blocked Users ({blockedUsers.length})
        </h2>

        {blockedUsers.length > 0 ? (
          <div className="bg-[var(--main-color-darker)] rounded-lg border border-[var(--g-color)] divide-y divide-[var(--g-color)] w-9/12">
            {blockedUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--g-color)] flex items-center justify-center text-white">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      user.username.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.username}</p>
                    <p className="text-[var(--g-color)] text-sm">
                      Blocked on {user.blockedDate}
                    </p>
                  </div>
                </div>

                <ActionButton
                  label="Unblock"
                  value={user.id}
                  isDirty={true}
                  error={false}
                  onClick={() => {
                    setUserToUnblock(user);
                    setUnblockPopupOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--g-color)]">
            You haven't blocked any users yet.
          </p>
        )}
      </div>

      {/* Block Confirmation Popup */}
      <ConfirmationPopup
        isOpen={blockPopupOpen}
        onClose={() => setBlockPopupOpen(false)}
        onConfirm={handleBlockUser}
        title={`Block ${userToBlock}?`}
        description={`Are you sure you want to block ${userToBlock}? You won't see their messages or content anymore.`}
        actionType="block"
      />

      {/* Unblock Confirmation Popup */}
      <ConfirmationPopup
        isOpen={unblockPopupOpen}
        onClose={() => setUnblockPopupOpen(false)}
        onConfirm={handleUnblockUser}
        title={`Unblock ${userToUnblock?.username}?`}
        description={`Are you sure you want to unblock ${userToUnblock?.username}? You'll start seeing their messages and content again.`}
        actionType="confirm"
      />
    </div>
  );
}
