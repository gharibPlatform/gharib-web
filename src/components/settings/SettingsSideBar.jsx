"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


export default function SettingsSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-[var(--main-color)] text-white rounded-md md:hidden"
          aria-label="Toggle settings menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative'
        }
        h-screen border-r border-[var(--g-color)] bg-[var(--main-color)] 
        w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72
        flex-shrink-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header with close button for mobile */}
          {isMobile && (
            <div className="flex justify-between items-center p-4 border-b border-[var(--g-color)]">
              <h2 className="text-white font-semibold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-[var(--main-color-hover)] p-1 rounded"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Settings items */}
          <div className="flex flex-col pt-4 px-2 overflow-y-auto">
            <SettingsItem 
              title="Account" 
              path="/settings/account" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Profile" 
              path="/settings/profile" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Appearance" 
              path="/settings/appearance" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Quran" 
              path="/settings/quran" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Security" 
              path="/settings/security" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Notifications" 
              path="/settings/notifications" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Language and region" 
              path="/settings/language" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
            <SettingsItem 
              title="Blocking" 
              path="/settings/blocking" 
              onItemClick={() => isMobile && setIsOpen(false)} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsItem({ title, path, onItemClick }) {
  const router = useRouter();
  const currentPath = usePathname();
  const isActive = currentPath === path;

  const handleClick = () => {
    router.push(path);
    onItemClick && onItemClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        hover:bg-[var(--main-color-hover)] 
        rounded-sm 
        py-3 
        px-4 
        sm:px-6 
        md:px-9 
        flex 
        items-center 
        gap-4 
        cursor-pointer 
        duration-100 
        transition-all 
        ease-in
        ${isActive ? "bg-[var(--main-color-hover)]" : ""}
      `}
    >
      <p className="text-sm sm:text-base text-white whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </p>
    </div>
  );
}