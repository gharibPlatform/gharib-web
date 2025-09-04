import DefaultIcon from "@/components/common/icon/DefaultIcon";

const GroupInfoTab = ({ group, user }) => {
  return (
    <>
      <div className="p-5 flex justify-center">
        {group.image ? (
          <img
            src={group.image}
            alt={group.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-[var(--g-color)]"
          />
        ) : (
          <DefaultIcon
            width={28}
            height={28}
            fontSize={28}
            name={group?.name || "G"}
          />
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
          <p className="text-sm text-[var(--b-color)]">{group.description}</p>
        </div>
      )}

      <div className="px-5 pb-5">
        <h3 className="font-semibold mb-2">Admin</h3>
        <div className="flex items-center">
          {group.created_by?.profile_pic ? (
            <img
              src={group.created_by.profile_pic}
              alt={group.created_by.username}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
          ) : (
            <DefaultIcon
              width={12}
              height={12}
              fontSize={28}
              name={group?.created_by || "U"}
            />
          )}
          <span className=" ml-3">{group.created_by?.username || "Unknown"}</span>
          {group.created_by?.id === user.id && (
            <span className="ml-2 text-xs bg-[var(--b-color)] px-2 py-1 rounded">
              You
            </span>
          )}
        </div>
      </div>

      <div className="px-5 pb-5">
        <h3 className="font-semibold mb-3">
          Members ({group?.members?.length})
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {group.members?.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {member.profile_pic ? (
                  <img
                    src={member.profile_pic}
                    alt={member.username}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                ) : (
                  <DefaultIcon
                    width={8}
                    height={8}
                    name={member?.username || "M"}
                  />
                )}
                <span className="text-sm ml-3">{member.username}</span>
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
    </>
  );
};

export default GroupInfoTab;
