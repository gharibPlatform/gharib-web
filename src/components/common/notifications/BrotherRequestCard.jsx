import Image from "next/image";

export default function BrotherRequestCard() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg duration-200">
      <div className="relative w-14 h-14 flex-shrink-0">
        <Image
          src={"/electron.svg"}
          className="rounded-full object-cover cursor-pointer"
          fill
          alt="accountImage"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-white text-lg">Malek Kaouche</p>
        <p className="text-md text-[var(--g-color)]">Has sent you a brother request.</p>
        <div className="flex gap-3 mt-1">
          <button className="hover:bg-[var(--b-color-hover)] w-full bg-[var(--b-color)] text-white py-1.5 px-5 rounded-[4px] text-lg">
            Accept
          </button>
          <button className="hover:bg-[var(--main-color-hover)] w-full bg-[var(--dark-color)] text-[var(--w-color)] py-1.5 px-5 rounded-[4px] text-lg border border-[var(--g-color)]">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}