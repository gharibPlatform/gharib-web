import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: "var(--darker-color)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container mx-auto px-6 py-14 max-w-7xl">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="space-y-10">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="arab font-light"
                style={{ color: "#dc9908", fontSize: "2.5rem", lineHeight: 1 }}
              >
                غ
              </div>
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: "var(--w-color)",
                    fontFamily: "var(--font-cairo)",
                  }}
                >
                  Gharib
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--g-color)" }}
                >
                  Connecting hearts through the Quran
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-widest mb-4"
                  style={{ color: "var(--g-color)" }}
                >
                  Company
                </h4>
                <div className="space-y-3">
                  {["About", "Careers"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm transition-colors"
                      style={{ color: "var(--lighter-color)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--w-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--lighter-color)")
                      }
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-widest mb-4"
                  style={{ color: "var(--g-color)" }}
                >
                  Connect
                </h4>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: "var(--lighter-color)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#5865F2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--lighter-color)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.112 18.102.128 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                    Discord
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: "var(--lighter-color)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--w-color)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--lighter-color)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--g-color)" }}
              >
                Contact
              </p>
              <a
                href="mailto:exemple@gmail.com"
                className="text-sm transition-colors"
                style={{ color: "var(--lighter-color)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--o-color)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--lighter-color)")
                }
              >
                exemple@gmail.com
              </a>
            </div>

            {/* Footer Bottom */}
            <div
              className="pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
                style={{ color: "var(--g-color)" }}
              >
                <p>© 2024 Gharib Inc.</p>
                <div className="flex gap-6">
                  {["Privacy", "Terms"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="transition-colors"
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--lighter-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--g-color)")
                      }
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div
            className="flex justify-between items-start pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Left - Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="arab font-light"
                  style={{ color: "#dc9908", fontSize: "3rem", lineHeight: 1 }}
                >
                  غ
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      color: "var(--w-color)",
                      fontFamily: "var(--font-cairo)",
                    }}
                  >
                    Gharib
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--g-color)" }}
                  >
                    Connecting hearts through the Quran
                  </p>
                </div>
              </div>
              <p
                className="text-sm max-w-xs leading-relaxed"
                style={{ color: "var(--g-color)" }}
              >
                A platform for meaningful Quranic engagement, group recitation,
                and daily spiritual growth.
              </p>
            </div>

            {/* Right - Navigation */}
            <div className="flex gap-20 pt-1">
              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-widest mb-5"
                  style={{ color: "var(--g-color)" }}
                >
                  Company
                </h4>
                <div className="space-y-3">
                  {["About", "Careers"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm transition-colors"
                      style={{ color: "var(--lighter-color)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--w-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--lighter-color)")
                      }
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-widest mb-5"
                  style={{ color: "var(--g-color)" }}
                >
                  Connect
                </h4>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: "var(--lighter-color)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#5865F2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--lighter-color)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.112 18.102.128 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                    Discord
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: "var(--lighter-color)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--w-color)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--lighter-color)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-widest mb-5"
                  style={{ color: "var(--g-color)" }}
                >
                  Contact
                </h4>
                <a
                  href="mailto:exemple@gmail.com"
                  className="text-sm transition-colors"
                  style={{ color: "var(--lighter-color)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--o-color)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--lighter-color)")
                  }
                >
                  exemple@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8">
            <div
              className="flex justify-between items-center text-xs"
              style={{ color: "var(--g-color)" }}
            >
              <p>© 2024 Gharib Inc. All rights reserved.</p>
              <div className="flex gap-8">
                {["Privacy Policy", "Terms of Service"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="transition-colors"
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--lighter-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "var(--g-color)")
                    }
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
