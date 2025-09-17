import CreateKhatmaModal from "./CreateKhatmaModal";
import KhatmaCard from "./KhatmaCard";
import { Plus, Target } from "lucide-react";
import { useState } from "react";
import { createKhatma } from "../../../../utils/khatma/apiKhatma";

export default function KhatmasSection({ khatmas, isLoadingKhatmas }) {
  const [showCreateKhatmaModal, setShowCreateKhatmaModal] = useState(false);

  const handleCreateKhatma = (khatmaData) => {

    createKhatma(khatmaData).then((res) => {
      console.log("res", res);
    });
    setShowCreateKhatmaModal(false);
  };

  if (isLoadingKhatmas) {
    return (
      <div className="p-4 text-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Your Khatmas</h3>
          <span className="text-sm text-white/70">Loading...</span>
        </div>
        <div className="space-y-4 mb-6">
          {/* Skeleton loading states */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-[var(--dark-color)] p-4 border border-white/5 animate-pulse"
            >
              <div className="h-4 bg-white/20 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-white/20 rounded w-1/2 mb-3"></div>
              <div className="h-2 bg-white/20 rounded w-full mb-2"></div>
              <div className="h-2 bg-white/20 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white">
      <CreateKhatmaModal
        isOpen={showCreateKhatmaModal}
        onClose={() => setShowCreateKhatmaModal(false)}
        onSubmit={handleCreateKhatma}
      />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Your Khatmas</h3>
        <span className="text-sm text-white/70">
          {khatmas.length} in progress
        </span>
      </div>

      <div className="space-y-4 mb-6">
        {khatmas.map((khatma) => (
          <div key={khatma.id}>
            <KhatmaCard khatma={khatma} />
          </div>
        ))}
      </div>

      <div className="bg-[var(--main-dark-color)] rounded-xl p-4 border border-dashed border-white/20 mb-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Target size={18} />
          Start a new Khatma
        </h4>
        <p className="text-sm text-white/70 mb-3">
          Begin a new reading journey with friends or by yourself
        </p>
        <button
          onClick={() => setShowCreateKhatmaModal(true)}
          className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors flex items-center justify-center gap-1"
        >
          <Plus size={18} />
          Create New Khatma
        </button>
      </div>
    </div>
  );
}
