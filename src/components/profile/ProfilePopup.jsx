"use client";
import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { reportUser } from "@/utils/apiUser";

export default function ProfilePopup({ user, onClose, position }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [category, setCategory] = useState("spam");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    if (!position || !popupRef.current) return;

    const updatePosition = () => {
      const popupWidth = 384; // w-96
      const rect = popupRef.current.getBoundingClientRect();
      const popupHeight = rect.height;
      const padding = 16;

      let left = position.x;
      let top = position.y;

      // keep inside viewport
      if (left + popupWidth > window.innerWidth - padding) {
        left = window.innerWidth - popupWidth - padding;
      }
      if (top + popupHeight > window.innerHeight - padding) {
        top = window.innerHeight - popupHeight - padding;
      }
      if (left < padding) left = padding;
      if (top < padding) top = padding;

      setCoords({ top, left });
    };

    // run once
    updatePosition();

    // update if popup height changes (e.g. report form opens)
    const observer = new ResizeObserver(updatePosition);
    observer.observe(popupRef.current);

    return () => observer.disconnect();
  }, [position]);

  const handleReport = async () => {
    try {
      setLoading(true);
      await reportUser({
        reported_user: user.id,
        category,
        description,
      });

      alert("Report submitted ✅");
      setShowReportForm(false);
      setCategory("spam");
      setDescription("");
    } catch (err) {
      console.error("Failed to report user:", err);
      alert("Failed to report user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute z-50"
      style={{
        top: coords.top,
        left: coords.left,
        position: "fixed",
      }}
    >
      <div
        ref={popupRef}
        className="relative w-96 p-6 rounded-2xl shadow-xl bg-white border"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Profile info */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.picture}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover shadow"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600 text-sm">{user.info}</p>
        </div>

        {/* 3-dot menu */}
        <div className="absolute top-3 left-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-32">
              <button
                onClick={() => {
                  setShowReportForm(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Report
              </button>
            </div>
          )}
        </div>

        {/* Report form */}
        {showReportForm && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Report User
            </h3>

            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 mb-3"
            >
              <option value="violence">Violence</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="other">Other</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1 mb-3"
              placeholder="Write details here..."
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReportForm(false)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Reporting..." : "Submit Report"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
