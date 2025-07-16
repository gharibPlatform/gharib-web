export default function HumburgerMenu() {
  return (
    <div className="p-2 hover:bg-[var(--main-color-hover)] rounded-md cursor-pointer transition-all duration-100 ease-in">
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="style=stroke">
            {" "}
            <g id="menu-hamburger">
              {" "}
              <path
                id="vector (Stroke)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6Z"
                fill="#ffffff"
              ></path>{" "}
              <path
                id="vector (Stroke)_2"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z"
                fill="#ffffff"
              ></path>{" "}
              <path
                id="vector (Stroke)_3"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H21C21.4142 17.25 21.75 17.5858 21.75 18C21.75 18.4142 21.4142 18.75 21 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
                fill="#ffffff"
              ></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>{" "}
    </div>
  );
}
