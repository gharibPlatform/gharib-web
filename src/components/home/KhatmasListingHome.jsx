"use client";
import { useState } from "react";
import {
  Plus,
  Target,
  Users,
  Trophy,
  Calendar,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import useQuranHeaderVerse from "../../stores/verseQuranHeaderStore";
import useKhatmaStore from "../../stores/khatmasStore";
import indexToStringSurah from "../../../indexToStringSurah.json";
import CreateKhatmaModal from "../quran/quranRightbar/CreateKhatmaModal";

const KhatmaCard = ({ khatma, onContinue, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    if (khatma.progress === 100)
      return "from-green-500/20 to-emerald-600/20 border-green-500/30";
    if (khatma.progress > 0)
      return "from-blue-500/20 to-cyan-600/20 border-blue-500/30";
    return "from-purple-500/20 to-indigo-600/20 border-purple-500/30";
  };

  const getProgressColor = () => {
    if (khatma.progress === 100)
      return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (khatma.progress > 0)
      return "bg-gradient-to-r from-blue-400 to-cyan-500";
    return "bg-gradient-to-r from-purple-400 to-indigo-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDaysLeft = () => {
    const finishDate = new Date(khatma.finishDate);
    const today = new Date();
    const timeDiff = finishDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft === 0) return "Ends today";
    if (daysLeft === 1) return "1 day left";
    if (daysLeft > 1) return `${daysLeft} days left`;
    return "Completed";
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${getStatusColor()} border rounded-2xl p-6 cursor-pointer transition-all duration-300 group backdrop-blur-sm ${
        isHovered ? "scale-[1.02] shadow-2xl" : "shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          khatma.progress === 100
            ? "from-green-500/10 to-emerald-600/10"
            : khatma.progress > 0
              ? "from-blue-500/10 to-cyan-600/10"
              : "from-purple-500/10 to-indigo-600/10"
        }`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
              {khatma.khatma.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{khatma.khatma?.group_date?.name || "Personal"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>
                  {formatDate(khatma.created_at)} -{" "}
                  {formatDate(khatma.finishDate)}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              khatma.progress === 100
                ? "bg-green-500/20 text-green-300"
                : khatma.progress > 0
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-purple-500/20 text-purple-300"
            }`}
          >
            {khatma.progress === 100
              ? "Completed"
              : khatma.progress > 0
                ? "In Progress"
                : "Not Started"}
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/80">
                Your Progress
              </span>
              <span className="text-sm font-bold text-white">
                {khatma.progress}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor()} ${
                  isHovered ? "shadow-lg" : ""
                }`}
                style={{ width: `${khatma.progress}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/80">
                Group Progress
              </span>
              <span className="text-sm font-bold text-white">
                {khatma.khatma.progress}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${khatma.khatma.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span className="font-medium text-nowrap">
                Surah {indexToStringSurah[khatma.currentSurah].name}:
                {khatma.currentVerse}
              </span>
            </div>
            <div className="flex items-center gap-1 text-nowrap px-2">
              <Clock size={16} />
              <span>{getDaysLeft()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContinue(khatma);
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-center font-medium text-sm transition-all duration-200 flex items-center gap-2 group/btn"
            >
              Continue
              <ChevronRight
                size={16}
                className="group-hover/btn:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function KhatmasListingHome({
  khatmas,
  isLoadingKhatmas,
  onCreateKhatma,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const router = useRouter();

  const { setGoToVerse } = useQuranHeaderVerse();
  const { setCurrentKhatma } = useKhatmaStore();

  const handleContinue = (khatma) => {
    setGoToVerse(khatma.currentSurah + ":" + khatma.currentVerse);
    router.push(`/quran/khatmas/${khatma.khatma.id}`);
    setCurrentKhatma(khatma);
  };

  const handleCardClick = (khatma) => {
    router.push(`/khatmas/${khatma.khatma.id}`);
  };

  if (isLoadingKhatmas) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30 rounded-2xl p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-600/30 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-600/30 rounded mb-6 w-1/2"></div>
              <div className="space-y-4 mb-6">
                <div className="h-3 bg-gray-600/30 rounded-full"></div>
                <div className="h-2 bg-gray-600/30 rounded-full w-2/3"></div>
              </div>
              <div className="h-10 bg-gray-600/30 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeKhatmas =
    khatmas?.filter(
      (khatma) => khatma.status === "ongoing" && khatma.progress !== 100
    ) || [];

  const completedKhatmas =
    khatmas?.filter((khatma) => khatma.progress === 100) || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Your Khatmas</h2>
          <p className="text-white/70">
            Track your Quran reading progress and join group readings
          </p>
        </div>
      </div>

      {activeKhatmas.length > 0 && (
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            In Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeKhatmas.map((khatma) => (
              <KhatmaCard
                key={khatma.id}
                khatma={khatma}
                onContinue={handleContinue}
                onClick={() => handleCardClick(khatma)}
              />
            ))}
          </div>
        </section>
      )}

      {completedKhatmas.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Trophy size={20} className="text-green-400" />
            Completed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedKhatmas.map((khatma) => (
              <KhatmaCard
                key={khatma.id}
                khatma={khatma}
                onContinue={handleContinue}
                onClick={() => handleCardClick(khatma)}
              />
            ))}
          </div>
        </section>
      )}

      {!activeKhatmas.length && !completedKhatmas.length && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <BookOpen size={40} className="text-white/50" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Khatmas Yet</h3>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Start your first Khatma to begin tracking your Quran reading
            progress with friends or individually.
          </p>
        </div>
      )}

      <div
        className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 border-dashed rounded-2xl p-8 text-center hover:from-white/10 hover:to-white/15 transition-all duration-300 group cursor-pointer"
        onClick={() => setShowCreateModal(true)}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
          <Plus size={32} className="text-white/70 group-hover:text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Start New Khatma
        </h3>
        <p className="text-white/70 mb-4 max-w-sm mx-auto">
          Begin a new Quran reading journey. Set your goals and invite friends
          to join.
        </p>
        <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2 mx-auto group/btn">
          <Target size={18} />
          Create Khatma
        </button>
      </div>

      <CreateKhatmaModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={onCreateKhatma}
      />
    </div>
  );
}
