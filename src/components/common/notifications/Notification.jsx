import useNotificationsStore from "@/stores/notificationsStore";
import { useEffect, useState } from "react";
import BrotherRequestCard from "./BrotherRequestCard";
import { Bell, AlertCircle, Loader2 } from "lucide-react";
import {
  acceptBrotherRequest,
  denyBrotherRequest,
} from "@/utils/notifications";

export default function Notifications() {
  const {
    notifications,
    fetchNotifications,
    loadingNotifications,
    errorNotifications,
  } = useNotificationsStore();

  const [processingRequests, setProcessingRequests] = useState(new Set());
  const [completedRequests, setCompletedRequests] = useState(new Set());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAccept = async (brothershipReqId) => {
    setProcessingRequests((prev) => new Set(prev).add(brothershipReqId));
    setErrors((prev) => ({ ...prev, [brothershipReqId]: null }));

    try {
      await acceptBrotherRequest(brothershipReqId);
      setCompletedRequests((prev) => new Set(prev).add(brothershipReqId));
      
      fetchNotifications();
    } catch (error) {
      console.error("Failed to accept brother request:", error);
      setErrors((prev) => ({
        ...prev,
        [brothershipReqId]: "Failed to accept request. Please try again.",
      }));
    } finally {
      setProcessingRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(brothershipReqId);
        return newSet;
      });
    }
  };

  const handleDecline = async (brothershipReqId) => {
    setProcessingRequests((prev) => new Set(prev).add(brothershipReqId));
    setErrors((prev) => ({ ...prev, [brothershipReqId]: null }));

    try {
      await denyBrotherRequest(brothershipReqId);
      setCompletedRequests((prev) => new Set(prev).add(brothershipReqId));

      fetchNotifications();
    } catch (error) {
      console.error("Failed to decline brother request:", error);
      setErrors((prev) => ({
        ...prev,
        [brothershipReqId]: "Failed to decline request. Please try again.",
      }));
    } finally {
      setProcessingRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(brothershipReqId);
        return newSet;
      });
    }
  };

  // Filter out completed requests if you want them to disappear
  const activeNotifications = notifications?.filter(
    (notification) => !completedRequests.has(notification.id)
  );

  return (
    <div className="flex flex-col w-80 h-96 bg-[var(--dark-color)] border border-[var(--secondary-color)] rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--secondary-color)]">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-[var(--b-color)] mr-2" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>
        <span className="flex items-center justify-center w-6 h-6 bg-[var(--b-color)] text-white text-xs font-bold rounded-full">
          {activeNotifications?.length || 0}
        </span>
      </div>

      {/* Notifications Content */}
      <div className="flex-1 overflow-hidden">
        {loadingNotifications ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-[var(--b-color)] animate-spin mb-3" />
            <p className="text-[var(--lighter-color)]">
              Loading notifications...
            </p>
          </div>
        ) : errorNotifications ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <AlertCircle className="h-10 w-10 text-[var(--bright-r-color)] mb-3" />
            <p className="text-[var(--bright-r-color)]">{errorNotifications}</p>
          </div>
        ) : activeNotifications?.length > 0 ? (
          <div className="h-full overflow-y-auto">
            {activeNotifications?.map((notification) => (
              <div
                key={notification.id}
                className="border-b border-[var(--secondary-color)] transition-colors"
              >
                <BrotherRequestCard
                  brothershipRequest={notification}
                  isProcessing={processingRequests.has(notification.id)}
                  error={errors[notification.id]}
                  onAccept={() => handleAccept(notification.id)}
                  onDecline={() => handleDecline(notification.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <Bell className="h-12 w-12 text-[var(--secondary-color)] mb-3 opacity-50" />
            <p className="text-[var(--lighter-color)]">No notifications yet</p>
            <p className="text-sm text-[var(--secondary-color)] mt-1">
              You'll see notifications here when you receive them
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--secondary-color)]">
        <button className="w-full py-2 bg-[var(--b-color)] text-white font-semibold rounded-md hover:bg-[var(--bright-b-color)] transition-colors">
          See More Notifications
        </button>
      </div>
    </div>
  );
}
