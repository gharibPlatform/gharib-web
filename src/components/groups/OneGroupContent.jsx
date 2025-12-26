import { Users, BookOpen } from "lucide-react";
import GroupMemberCard from "./GroupMemberCard";
import GroupKhatmaCard from "./GroupKhatmaCard";

export const GroupContent = ({
  activeTab,
  filteredMembers,
  filteredKhatmas,
  isAdmin,
  groupId,
  searchQuery,
}) => {
  if (activeTab === "members") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers?.map((member) => (
            <GroupMemberCard
              key={member.id}
              member={member.user}
              role={member.role}
              isAdmin={isAdmin}
              groupId={groupId}
            />
          ))}
        </div>

        {filteredMembers?.length === 0 && (
          <EmptyState type="members" hasSearch={!!searchQuery} />
        )}
      </>
    );
  }

  return (
    <>
      {!filteredKhatmas || filteredKhatmas.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <BookOpen size={40} className="text-white/50" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Khatmas Yet</h3>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            There are no khatmas in this group yet. Start one to begin reading
            together.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKhatmas.map((khatma) => (
            <GroupKhatmaCard
              key={khatma.id}
              khatma={khatma}
              groupId={groupId}
            />
          ))}
        </div>
      )}

      {filteredKhatmas?.length === 0 && searchQuery && (
        <EmptyState type="khatmas" hasSearch={true} />
      )}
    </>
  );
};

const EmptyState = ({ type, hasSearch }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div
      className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
      style={{ background: "var(--input-color)" }}
    >
      {type === "members" ? (
        <Users
          className="w-10 h-10"
          style={{ color: "var(--lighter-color)" }}
        />
      ) : (
        <BookOpen
          className="w-10 h-10"
          style={{ color: "var(--lighter-color)" }}
        />
      )}
    </div>
    <h3
      className="text-xl font-medium mb-3"
      style={{ color: "var(--w-color)" }}
    >
      No {type} found
    </h3>
    <p
      className="text-center max-w-md mb-6"
      style={{ color: "var(--lighter-color)" }}
    >
      {hasSearch
        ? "Try adjusting your search terms"
        : `This group has no ${type} yet`}
    </p>
  </div>
);
