import BrotherRequestCard from "./BrotherRequestCard";

function NotificationsMenu({ toggleNotificationsMenu }) {
  return (
    <>
      <div
        className="bg-[var(--main-color)] flex flex-col absolute right-5 top-10 mr-3 w-82 z-10 border-[var(--g-color)] border pb-6"
        style={{
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
      >
        <BrotherRequestCard />

        <div className="flex items-center justify-center py-4 ">
            <div className="border-t border-[var(--g-color)] w-full"></div>
        </div>
        
        <BrotherRequestCard />

      </div>
    </>
  );
}
export default NotificationsMenu;