"use client";
import React from "react";
import { X } from "lucide-react";
import useUserStore from "../../../stores/userStore";

const ChatSideBar = ({ group, onClose }) => {
  const { user } = useUserStore();

  if (!group) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-80 bg-[var(--main-color)] border-l border-[var(--g-color)] text-white shadow-xl lg:relative lg:right-auto lg:top-auto lg:h-full lg:w-80 flex flex-col">
        <div className="flex items-center justify-between px-4 py-[41px] border-b border-[var(--g-color)]">
          <h2 className="font-semibold text-lg">Group Info</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--g-color)] rounded transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 flex justify-center">
            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-[var(--g-color)]"
              />
            ) : (
              <div className="w-28 h-28 rounded-full border-4 border-[var(--g-color)] flex items-center justify-center bg-[var(--g-color)]">
                <span className="text-white text-3xl font-bold">
                  {group.name?.charAt(0) || "G"}
                </span>
              </div>
            )}
          </div>

          <div className="px-5 pb-4 text-center">
            <h1 className="text-xl font-bold">{group.name}</h1>
            <p className="text-[var(--b-color)] mt-1">
              {group.members_count} members
            </p>
          </div>

          {group.description && (
            <div className="px-5 pb-5">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-[var(--b-color)]">
                {group.description}
              </p>
            </div>
          )}

          <div className="px-5 pb-5">
            <h3 className="font-semibold mb-2">Created By</h3>
            <div className="flex items-center">
              {group.created_by?.profile_pic ? (
                <img
                  src={group.created_by.profile_pic}
                  alt={group.created_by.username}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--g-color)] flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-semibold">
                    {group.created_by?.username?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <span>{group.created_by?.username || "Unknown"}</span>
              {group.created_by?.id === user.id && (
                <span className="ml-2 text-xs bg-[var(--b-color)] px-2 py-1 rounded">
                  You
                </span>
              )}
            </div>
          </div>

          <div className="px-5 pb-5">
            <h3 className="font-semibold mb-3">
              Members ({group.members_count})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {group.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {member.profile_pic ? (
                      <img
                        src={member.profile_pic}
                        alt={member.username}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--g-color)] flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-semibold">
                          {member.username?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <span className="text-sm">{member.username}</span>
                    {member.id === user.id && (
                      <span className="ml-2 text-xs bg-[var(--b-color)] px-2 py-1 rounded">
                        You
                      </span>
                    )}
                  </div>
                  {member.id === group.created_by?.id && (
                    <span className="text-xs text-[var(--b-color)] bg-[var(--g-color)] px-2 py-1 rounded">
                      Admin
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--g-color)] mt-auto">
          <button className="w-full bg-[var(--r-color)] hover:bg-red-700 text-white py-2 px-4 rounded transition-colors">
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
