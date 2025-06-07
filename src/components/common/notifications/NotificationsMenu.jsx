import { useState, useEffect } from 'react';
import BrotherRequestCard from "./BrotherRequestCard";
import { acceptBrotherRequest, denyBrotherRequest, getBrotherRequests } from "@/utils/notifications";

function NotificationsMenu({ toggleNotificationsMenu }) {
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getBrotherRequests();
        console.log(data)
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch brother requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (userId) => {
    try {
      await acceptBrotherRequest(userId);
      setRequests(prev => ({
        ...prev,
        received: prev.received.filter(req => req.id !== userId)
      }));
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
        console.log(requestId)
      await denyBrotherRequest(18);
      setRequests(prev => ({
        ...prev,
        received: prev.received.filter(req => req.id !== requestId)
      }));
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  return (
    <div
      className="bg-[var(--main-color)] flex flex-col absolute right-5 top-10 mr-3 w-82 z-10 border-[var(--g-color)] border pb-6"
      style={{
        borderBottomRightRadius: "12px",
        borderBottomLeftRadius: "12px",
      }}
    >
      {loading ? (
        <div className="p-4 text-white">Loading requests...</div>
      ) : (
        <>
          {/* Received Requests Section */}
          {requests?.recieved?.length > 0 ? (
            <>
              <h3 className="text-white px-4 pt-4 pb-2 font-medium">Received Requests</h3>
              {requests.recieved.map((request) => (
                <div key={request.id}>
                  <BrotherRequestCard 
                    request={request}
                    type="received"
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                  {/* <div className="flex items-center justify-center py-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                  </div> */}
                </div>
              ))}
            </>
          ) : (
            <div className="p-4 text-white">No received requests</div>
          )}

          {/* Sent Requests Section */}
          {requests.sent.length > 0 && (
            <>
              <h3 className="text-white px-4 pt-4 pb-2 font-medium">Sent Requests</h3>
              {requests.sent.map((request) => (
                <div key={request.id}>
                  <BrotherRequestCard 
                    request={request}
                    type="sent"
                  />
                  {/* <div className="flex items-center justify-center py-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                  </div> */}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NotificationsMenu;