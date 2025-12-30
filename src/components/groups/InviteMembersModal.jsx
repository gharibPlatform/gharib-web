import { useState, useEffect, useRef } from "react";
import {
  X,
  User,
  Users,
  CheckCircle,
  XCircle,
  Mail,
  RefreshCw,
  Calendar,
  Clock,
  Copy,
  Key,
  Search,
  Check,
} from "lucide-react";

import {
  getGroupCodeInfo,
  generateGroupCode,
} from "../../utils/group/apiGroupShare";
import DefaultIcon from "../common/icon/DefaultIcon";
import useBrothersStore from "../../stores/user/useBrothersStore";

export const InviteSuccessModal = ({ count, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-green-500/30 shadow-2xl max-w-lg w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--w-color)] mb-3">
            Invitations Sent!
          </h3>
          <p className="text-[var(--g-color)] text-lg mb-8">
            Successfully invited{" "}
            <span className="text-green-400 font-semibold text-xl">
              {count}
            </span>{" "}
            member{count !== 1 ? "s" : ""} to the group.
          </p>
          <p className="text-[var(--g-color)] mb-8">
            They'll receive a notification and can accept your invitation to
            join the group.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity w-full text-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const InviteErrorModal = ({ error, onClose, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--r-color)]/30 shadow-2xl max-w-lg w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[var(--r-color)]/20 rounded-full flex items-center justify-center mb-6">
            <XCircle size={48} className="text-[var(--r-color)]" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--w-color)] mb-3">
            Couldn't Send Invitations
          </h3>
          <div className="bg-[var(--dark-color)] p-6 rounded-xl border border-[var(--r-color)]/20 mb-8 w-full">
            <p className="text-[var(--g-color)] text-lg">
              {error || "Failed to send invitations. Please try again."}
            </p>
          </div>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="px-6 py-4 bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium hover:bg-[var(--main-color-hover)] transition-colors flex-1 text-lg"
            >
              Cancel
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-4 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex-1 text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InviteMembersModal({
  onClose,
  groupName,
  groupId,
  onInviteMembers,
}) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("friends");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const modalRef = useRef(null);
  const codeInputRef = useRef(null);

  const [groupCode, setGroupCode] = useState(null);
  const [loadingCode, setLoadingCode] = useState(true);
  const [codeError, setCodeError] = useState("");

  const { brothers, isLoadingBrothers, fetchBrothers } = useBrothersStore();

  useEffect(() => {
    fetchGroupCode();
    fetchBrothers();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, groupId, fetchBrothers]);

  useEffect(() => {
    if (brothers) {
      console.log("brothers is : ", brothers);
    }
  }, [brothers]);

  const fetchGroupCode = async () => {
    setLoadingCode(true);
    setCodeError("");
    try {
      const data = await getGroupCodeInfo(groupId);

      if (data && data.code && data.code !== "") {
        setGroupCode(data);
      } else {
        setGroupCode(null);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setGroupCode(null);
      } else {
        setCodeError("Failed to load group code");
        console.error("Error fetching group code:", err);
      }
    } finally {
      setLoadingCode(false);
    }
  };

  const handleGenerateCode = async () => {
    setGenerating(true);
    setCodeError("");
    try {
      const data = await generateGroupCode({ group_id: groupId });
      setGroupCode(data);
    } catch (err) {
      setCodeError(err.message || "Failed to generate group code");
    } finally {
      setGenerating(false);
    }
  };

  const toggleFriendSelection = (friend) => {
    setSelectedFriends((prev) => {
      const isSelected = prev.some((f) => f.id === friend.id);
      if (isSelected) {
        return prev.filter((f) => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (activeTab === "friends") {
      if (selectedFriends.length === 0) {
        setError("Please select at least one friend");
        return;
      }

      const usernameList = selectedFriends.map(
        (friend) => friend.brother.username
      );

      setIsLoading(true);

      try {
        await onInviteMembers(usernameList);
        setTimeout(() => {
          onClose();
        }, 500);
      } catch (err) {
        setError(err.message || "Failed to invite members");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCopyCode = () => {
    if (groupCode?.code) {
      navigator.clipboard.writeText(groupCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCodeExpired = () => {
    if (!groupCode?.expiration_date) return false;
    return new Date(groupCode.expiration_date) < new Date();
  };

  const getTimeLeft = () => {
    if (!groupCode?.expiration_date) return "";
    const expiration = new Date(groupCode.expiration_date);
    const now = new Date();
    const diffMs = expiration - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (diffMs <= 0) return "Expired";
    if (diffDays > 0) return `${diffDays}d ${diffHours}h left`;
    return `${diffHours}h left`;
  };

  const filteredFriends =
    brothers?.filter((friend) =>
      friend?.brother?.username
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--g-color)] border-opacity-30 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-[var(--g-color)] border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--w-color)]">
                  Invite to Group
                </h2>
                <p className="text-[var(--g-color)] text-lg mt-2">
                  Invite members to join "{groupName}"
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-[var(--g-color)] hover:text-[var(--w-color)] hover:bg-[var(--main-color-hover)] rounded-lg"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-6 border-b border-[var(--g-color)] border-opacity-20">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("friends")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "friends"
                  ? "border-[var(--bright-b-color)] text-[var(--bright-b-color)]"
                  : "border-transparent text-[var(--g-color)] hover:text-[var(--w-color)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <User size={16} />
                Invite Friends
              </div>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "code"
                  ? "border-[var(--bright-b-color)] text-[var(--bright-b-color)]"
                  : "border-transparent text-[var(--g-color)] hover:text-[var(--w-color)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Key size={16} />
                Invite Code
              </div>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "friends" ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="text-[var(--w-color)] text-lg font-medium flex items-center mb-4">
                  <div className="w-8 h-8 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <User size={18} className="text-[var(--w-color)]" />
                  </div>
                  Select Friends
                </label>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--g-color)]"
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 border-[var(--g-color)] border-opacity-30 py-3 px-4 pl-12 transition-all"
                    placeholder="Search friends?..."
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                {/* Selected Friends Preview */}
                {selectedFriends?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[var(--w-color)] font-medium">
                        Selected ({selectedFriends?.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedFriends([])}
                        className="text-sm text-[var(--g-color)] hover:text-[var(--w-color)]"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedFriends?.map((friend) => (
                        <div
                          key={friend.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--bright-b-color)]"
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <DefaultIcon
                              name={friend.brother.username}
                              fontSize={18}
                              height={8}
                              width={8}
                              className="text-white"
                            />
                          </div>
                          <span className="text-[var(--w-color)] text-sm font-medium">
                            {friend.brother.username}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleFriendSelection(friend)}
                            className="text-[var(--g-color)] hover:text-[var(--w-color)]"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Friends List */}
                <div className="bg-[var(--dark-color)] rounded-xl border border-[var(--g-color)] border-opacity-30 max-h-60 overflow-y-auto">
                  {isLoadingBrothers ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--bright-b-color)] border-t-transparent"></div>
                    </div>
                  ) : filteredFriends?.length > 0 ? (
                    filteredFriends?.map((friend) => {
                      const isSelected = selectedFriends?.some(
                        (f) => f.id === friend.id
                      );
                      return (
                        <div
                          key={friend.id}
                          className={`flex items-center gap-4 p-4 cursor-pointer transition-colors border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 ${
                            isSelected
                              ? "bg-gradient-to-r from-[var(--bright-b-color)]/10 to-[var(--b-color)]/10"
                              : "hover:bg-[var(--main-color)]"
                          }`}
                          onClick={() => toggleFriendSelection(friend)}
                        >
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center">
                              <DefaultIcon
                                name={friend.brother.username}
                                fontSize={24}
                                height={12}
                                width={12}
                                className="text-white"
                              />
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[var(--dark-color)]">
                                <Check size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[var(--w-color)] font-medium">
                              {friend.brother.username}
                            </h4>
                            {friend.brother_since && (
                              <p className="text-[var(--g-color)] text-sm">
                                {friend.brother_since}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[var(--dark-color)] rounded-full flex items-center justify-center">
                        <User size={20} className="text-[var(--g-color)]" />
                      </div>
                      <p className="text-[var(--g-color)]">
                        {searchQuery
                          ? "No friends found"
                          : "No friends available"}
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-[var(--r-color)]/10 border border-[var(--r-color)]/20 rounded-xl">
                    <p className="text-[var(--r-color)] text-lg">{error}</p>
                  </div>
                )}
              </div>

              {/* Footer Actions - Inline */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--g-color)] border-opacity-20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[var(--w-color)] bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={selectedFriends.length === 0 || isLoading}
                  className={`px-8 py-3 text-white text-lg rounded-xl font-medium flex items-center gap-3 ${
                    isLoading
                      ? "bg-[var(--b-color)]"
                      : "bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:from-[var(--b-color-hover)] hover:to-[var(--bright-b-color)]"
                  } ${
                    selectedFriends.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={20} />
                      Invite {selectedFriends.length}{" "}
                      {selectedFriends.length === 1 ? "Friend" : "Friends"}{" "}
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* ... (keep the existing code tab content exactly as it was) ... */}
              <div className="mb-8">
                <label className="text-[var(--w-color)] text-lg font-medium flex items-center mb-4">
                  <div className="w-8 h-8 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Key size={18} className="text-[var(--w-color)]" />
                  </div>
                  Group Invite Code
                </label>

                {loadingCode ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--bright-b-color)] border-t-transparent"></div>
                  </div>
                ) : groupCode ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        ref={codeInputRef}
                        type="text"
                        value={groupCode.code}
                        readOnly
                        className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] text-lg rounded-xl border-2 py-4 px-4 pr-36 font-mono ${
                          !groupCode.active || isCodeExpired()
                            ? "border-red-500/30 opacity-70"
                            : "border-green-500/30"
                        }`}
                      />
                      <button
                        onClick={handleCopyCode}
                        disabled={!groupCode.active || isCodeExpired()}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg font-medium transition-opacity flex items-center gap-2 ${
                          !groupCode.active || isCodeExpired()
                            ? "bg-gray-500 cursor-not-allowed text-gray-300"
                            : "bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:opacity-90 text-white"
                        }`}
                      >
                        {copied ? (
                          "Copied!"
                        ) : (
                          <>
                            <Copy size={16} /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    {/* Code Info */}
                    <div className="bg-gradient-to-r from-[var(--dark-color)] to-[var(--main-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-[var(--g-color)] text-sm mb-1">
                            <Clock size={14} />
                            <span>Status</span>
                          </div>
                          <span
                            className={`font-medium ${
                              !groupCode.active
                                ? "text-red-400"
                                : isCodeExpired()
                                  ? "text-red-400"
                                  : "text-green-400"
                            }`}
                          >
                            {!groupCode.active
                              ? "Inactive"
                              : isCodeExpired()
                                ? "Expired"
                                : "Active"}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-[var(--g-color)] text-sm mb-1">
                            <Calendar size={14} />
                            <span>Expires</span>
                          </div>
                          <div>
                            <div className="text-[var(--w-color)] font-medium text-sm">
                              {formatDate(groupCode.expiration_date)}
                            </div>
                            <div
                              className={`text-xs ${
                                isCodeExpired()
                                  ? "text-red-400"
                                  : "text-green-400"
                              }`}
                            >
                              {getTimeLeft()}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-[var(--g-color)] text-sm mb-1">
                            <User size={14} />
                            <span>Created by</span>
                          </div>
                          <span className="text-[var(--w-color)] font-medium text-sm">
                            @{groupCode.issued_by.username}
                          </span>
                        </div>
                      </div>
                    </div>

                    {(!groupCode.active || isCodeExpired()) && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <p className="text-yellow-400 text-sm">
                          {!groupCode.active
                            ? "This code is inactive. Generate a new one to invite members."
                            : "This code has expired. Generate a new one to invite members."}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[var(--dark-color)] rounded-full flex items-center justify-center">
                      <Key size={24} className="text-[var(--g-color)]" />
                    </div>
                    <h4 className="text-[var(--w-color)] font-medium mb-2">
                      No Invite Code
                    </h4>
                    <p className="text-[var(--g-color)] mb-6">
                      Generate an invite code to share with members
                    </p>
                    {codeError && (
                      <div className="mb-4 p-3 bg-[var(--r-color)]/10 border border-[var(--r-color)]/20 rounded-lg">
                        <p className="text-[var(--r-color)] text-sm">
                          {codeError}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-[var(--dark-color)] to-[var(--main-color)] p-6 rounded-xl border border-[var(--g-color)] border-opacity-20">
                <h4 className="text-[var(--w-color)] font-medium mb-3">
                  How to Use
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--bright-b-color)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--bright-b-color)] text-sm font-bold">
                        1
                      </span>
                    </div>
                    <span className="text-[var(--g-color)] text-sm">
                      Share the code with anyone you want to invite
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--bright-b-color)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--bright-b-color)] text-sm font-bold">
                        2
                      </span>
                    </div>
                    <span className="text-[var(--g-color)] text-sm">
                      They can enter this code in the "Join Group" section
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--bright-b-color)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--bright-b-color)] text-sm font-bold">
                        3
                      </span>
                    </div>
                    <span className="text-[var(--g-color)] text-sm">
                      Each code can be used multiple times until it expires
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions - Inline */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--g-color)] border-opacity-20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[var(--w-color)] bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium transition-colors"
                >
                  Done
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab("friends")}
                    className="px-6 py-3 text-white rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:from-[var(--b-color-hover)] hover:to-[var(--bright-b-color)] transition-all"
                  >
                    <User size={18} />
                    Invite Friends
                  </button>

                  <button
                    onClick={handleGenerateCode}
                    disabled={
                      generating ||
                      (groupCode && groupCode.active && !isCodeExpired())
                    }
                    className={`px-6 py-3 text-white rounded-xl font-medium flex items-center gap-2 transition-all ${
                      generating ||
                      (groupCode && groupCode.active && !isCodeExpired())
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                    }`}
                  >
                    {generating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={18} />
                        {groupCode ? "Regenerate" : "Generate"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
