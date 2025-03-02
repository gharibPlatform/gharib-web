export default function OpenMenu() {
    return (
      <div className="absolute text-md border border-[var(--g-color)] right-2bu top-8 w-44 p-2 bg-[var(--main-color)] rounded-md shadow-lg z-10">
        <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">
          View Profile
        </div>
        <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">
          Mute User
        </div>
        <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">
          Progress
        </div>
        <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">
          Delete Chat
        </div>
        <div className="text-[var(--r-color)] bg-[var(--main-color)] items-center justify-center py-4 flex cursor-pointer hover:bg-[var(--secondary-color)] ">
          Block User
        </div>
      </div>
    );
}
  