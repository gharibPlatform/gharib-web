import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import OpenMenu from "@/components/common/open menu/OpenMenu";
import Tooltip from "@/components/common/tooltip/Tooltip";
import EditGroupSettings from "../groups/EditGroupSettings";
import AddBrother from "../groups/AddBrother";
import ShareGroup from "../groups/ShareGroup";
import useGroupStore from "@/stores/groupStore";
export default function GroupSideBar() {
  const { group } = useGroupStore();
  const brothersDataArray = group.members;
  const adminName = "Walid";
  const [activeUser, setActiveUser] = useState(null);
  const menuRef = useRef(null);
  console.log(group);
  const [showEditDMConfirmation, setShowEditDMConfirmation] = useState(false);
  const editDMRef = useRef(null);

  const [showAddBrotherConfirmation, setShowAddBrotherConfirmation] =
    useState(false);
  const addBrotherRef = useRef(null);

  const [showShareGroupConfirmation, setShowShareGroupConfirmation] =
    useState(false);
  const shareGroupRef = useRef(null);

  // Close the modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (editDMRef.current && !editDMRef.current.contains(event.target)) {
        setShowEditDMConfirmation(false);
      }
      if (
        addBrotherRef.current &&
        !addBrotherRef.current.contains(event.target)
      ) {
        setShowAddBrotherConfirmation(false);
      }
      if (
        shareGroupRef.current &&
        !shareGroupRef.current.contains(event.target)
      ) {
        setShowShareGroupConfirmation(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveUser(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between flex-col p-6 w-[360px] border-l border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]">
      <div className="flex-col flex-nowrap w-full h-min">
        <div
          className="w-full py-2 text-lg font-semibold mb-5 text-[var(--w-color)] flex  gap-12 items-center"
          onClick={() => setShowEditDMConfirmation(true)}
        >
          Edit group settings
          <button className="flex gap-2 items-center justify-center rounded-sm py-2 bg-[var(--darker-color)] px-4 text-[var(--w-color)] hover:bg-[var(--dark-color)]">
            Edit
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>

        {showEditDMConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
            <div className="absolute inset-0 pointer-events-none"></div>
            <div ref={editDMRef}>
              <EditGroupSettings groupId={group.id} />
            </div>
          </div>
        )}

        <h2 className="text-lg font-semibold text-[var(--w-color)] mb-2">
          Group Members
        </h2>
        <div className="mb-4" ref={menuRef}>
          {brothersDataArray.map((brother) => (
            <GroupSidebarCard
              key={brother.id}
              name={brother.username}
              isAdmin={brother.username === adminName}
              isActive={activeUser === brother.username} // Pass if it's active
              onClick={() =>
                setActiveUser(
                  activeUser === brother.username ? null : brother.username,
                )
              } // Toggle menu
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-col mt-auto justify-center items-center">
        <button className="w-full py-2 px-4 text-[var(--r-color)] hover:bg-[var(--main-color-hover)]">
          Delete Group
        </button>
        <button className="w-full py-2 px-4 text-[var(--w-color)] hover:bg-[var(--g-color)]">
          Leave Group
        </button>
        <button
          onClick={() => setShowAddBrotherConfirmation(true)}
          className="w-full py-2 px-4 text-[var(--w-color)] hover:bg-[var(--g-color)]"
        >
          Add Brother
        </button>

        <button
          onClick={() => setShowShareGroupConfirmation(true)}
          className="w-full py-2 px-4 text-[var(--w-color)] hover:bg-[var(--g-color)]"
        >
          Share group
        </button>

        {showAddBrotherConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
            <div className="absolute inset-0 pointer-events-none"></div>
            <div ref={addBrotherRef}>
              <AddBrother selectedUsers={brothersDataArray} />
            </div>
          </div>
        )}

        {showShareGroupConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
            <div className="absolute inset-0 pointer-events-none"></div>
            <div ref={shareGroupRef}>
              <ShareGroup groupId={1} hasExistingCode={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GroupSidebarCard({ name, isAdmin, isActive, onClick }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    onClick();
    handleMouseMove(event);
  };

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    console.log("y : ", event.clientY);
    console.log("x : ", event.clientX);
  };

  return (
    <div className="relative">
      <div
        onClick={(event) => handleClick(event)}
        className="flex items-center justify-between p-2 hover:bg-[var(--main-color-hover)] cursor-pointer"
      >
        <div className="flex justify-between items-center gap-2">
          <Image
            src={"/electron.svg"}
            className="w-12 h-12 cursor-pointer"
            width={1}
            height={1}
            alt="accountImage"
          />
          <span className="text-[var(--w-color)]">{name}</span>
        </div>
        {isAdmin && (
          <Tooltip text="Admin" top={-25} right={-20}>
            <svg
              className="h-6 w-6"
              fill="#ffffff"
              height="200px"
              width="200px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 245.01 245.01"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M244.914,188.109l-9.951-133.345c-0.39-5.22-4.738-9.256-9.973-9.256h-31.994v54.413h2.666c2.571,0,4.737,1.92,5.047,4.473 l4.181,34.545c0.073,0.344,0.112,0.7,0.112,1.066c0,2.808-2.276,5.083-5.084,5.083c-0.005,0-0.013,0.001-0.02,0h-28.805 c-1.455,0-2.84-0.623-3.805-1.711c-0.965-1.089-1.417-2.539-1.242-3.982l4.236-35c0.31-2.553,2.476-4.473,5.047-4.473h2.666V45.509 H20c-5.234,0-9.583,4.036-9.973,9.256l-10,133.992c-0.207,2.773,0.751,5.509,2.644,7.547c1.892,2.039,4.548,3.197,7.329,3.197 h224.99c0.008,0,0.016,0.001,0.02,0c5.523,0,10-4.478,10-10C245.01,189.028,244.978,188.564,244.914,188.109z"></path>
              </g>
            </svg>
          </Tooltip>
        )}
      </div>
      {isActive && <OpenMenu xAxis={mousePosition.x} yAxis={mousePosition.y} />}
    </div>
  );
}
