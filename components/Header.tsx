"use client";

import { ArrowPathIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const handleRefresh = () => {
    window.location.reload(); // Can be replaced with refetch from React Query
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo / Title */}
      <div className="text-xl font-bold text-blue-600 tracking-tight">
        🌊 Smart Buoy Dashboard
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRefresh}
          title="Refresh"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowPathIcon className="h-6 w-6 text-gray-600" />
        </button>

        <button
          title="Settings"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Placeholder user info */}
        <div className="flex items-center gap-2">
          <img src="globe.svg" alt="User Avatar" className="h-8 w-8 rounded-full object-cover"/>
          <img src="/img1.png" alt="User Avatar" className="h-8 w-8 rounded-full object-cover"/>
          <span className="text-sm text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
