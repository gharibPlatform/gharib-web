import ChatKhatmaCard from "./ChatKhatmaCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useKhatmaStore from "../../../stores/khatmasStore";

export default function ChatKhatmasSection() {
  const BACKGROUND_COLOR = "#212121";

  const { userKhatmas, fetchUserKhatmas } = useKhatmaStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKhatmas = async () => {
      try {
        setLoading(true);
        await fetchUserKhatmas();
      } catch (err) {
        console.error("Error fetching khatmas:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKhatmas();
  }, [fetchUserKhatmas]);

  const handleCardClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

  function calculateTimeLeft(endDate) {
    if (!endDate) return "No deadline";

    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
  }

  if (loading) {
    return (
      <div className="p-4 text-[var(--g-color)] text-center">
        Loading khatmas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">Error loading khatmas</div>
    );
  }

  if (!userKhatmas || userKhatmas.length === 0) {
    return (
      <div className="p-4 text-[var(--g-color)] text-center">
        No khatmas available
      </div>
    );
  }

  return (
    <div>
      {userKhatmas
        .filter((item) => item.khatma?.status !== "Finished")
        .map((item) => {
          const khatma = item.khatma;
          if (!khatma) return null;

          return (
            <div
              key={`khatma-${khatma.id}`}
              onClick={() => handleCardClick(khatma.id)}
              className="cursor-pointer"
            >
              <ChatKhatmaCard
                backgroundColor={BACKGROUND_COLOR}
                name={khatma.name}
                percentage={khatma.progress || 0}
                timeLeft={calculateTimeLeft(khatma.endDate)}
              />
            </div>
          );
        })}
    </div>
  );
}
