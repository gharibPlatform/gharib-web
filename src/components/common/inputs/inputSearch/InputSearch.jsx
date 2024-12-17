
function InputSearch() {
    return (
      <>
        <div className="flex items-center justify-center ml-20 ">
          <svg
            className="z-10 -m-8 w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <input
            placeholder="Search..."
            className="focus:outline-none placeholder-gray-500 bg-[var(--input-color)] h-9 rounded-md pl-10 text-[var(--w-color)] -m-r-30"
            style={{ width: "700px" }}
            type="text"
            name=""
            id=""
          />
        </div>
      </>
    );
}
export default InputSearch;