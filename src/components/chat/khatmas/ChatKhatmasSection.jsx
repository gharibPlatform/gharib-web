import ChatKhatmaCard from "./ChatKhatmaCard";
import useKhatmasContentStore from "@/stores/khatmasStore";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getListKhatma, getKhatmaByGroup } from "@/utils/apiKhatma";
import useKhatmaStore from "@/stores/khatmasStore";

export default function ChatKhatmasSection() {
  const BACKGROUND_COLOR = "#212121";
  const BACKGROUND_COLOR_NEW = "#323232";

  const updateKhatmasContent = useKhatmasContentStore(
    (state) => state.updateKhatmasContent,
  );
  const { userKhatmas, fetchUserKhatmas } = useKhatmaStore();

  const router = useRouter();
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const [khatmas, setKhatmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKhatmas = async () => {
      try {
        setLoading(true);
        await fetchUserKhatmas();

        // Combine current and historical khatmas

        const khatmaList = userKhatmas?.map((item) => item.khatma);
        console.log(khatmaList);
        setKhatmas(khatmaList);
        // Set active index
        const foundIndex = userKhatmas?.findIndex(
          (item) => item.name === params.name,
        );
        if (foundIndex !== -1) {
          setActiveIndex(foundIndex);
        }
      } catch (err) {
        console.error("Error fetching khatmas:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKhatmas();
  }, [params.name]);

  const handleCardClick = (khatma, index) => {
    setActiveIndex(index);
    updateKhatmasContent({
      name: khatma.name,
      percentage: khatma.progress || 0,
      timeLeft: khatma.endDate
        ? calculateTimeLeft(khatma.endDate)
        : "No deadline",
      status: khatma.status || "Active",
      activeTabStore: "khatmas",
    });
    router.push(`/khatmas/${khatma.name}`);
  };

  function calculateTimeLeft(endDate) {
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

  if (loading)
    return (
      <div className="p-4 text-[var(--g-color)] text-center">
        Loading khatmas...
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error loading khatmas</div>
    );
  if (khatmas.length === 0)
    return (
      <div className="p-4 text-[var(--g-color)] text-center">
        No khatmas available
      </div>
    );

  return (
    <div>
      {khatmas
        .filter((khatma) => khatma.status !== "Finished")
        .map((khatma, index) => (
          <div
            key={`khatma-${khatma.id || index}`}
            onClick={() => handleCardClick(khatma, index)}
            className="cursor-pointer"
          >
            <ChatKhatmaCard
              backgroundColor={
                khatma.name === params?.name
                  ? BACKGROUND_COLOR_NEW
                  : BACKGROUND_COLOR
              }
              name={khatma.name}
              percentage={khatma.progress || 0}
              timeLeft={
                khatma.endDate
                  ? calculateTimeLeft(khatma.endDate)
                  : "No deadline"
              }
            />
          </div>
        ))}
    </div>
  );
}
