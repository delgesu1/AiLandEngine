"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white h-15 border-b border-gray-200 flex items-center justify-between px-5 py-3">
      <div className="flex items-center bg-[#f5f7fa] rounded-lg px-4 py-2 w-[400px]">
        <span className="text-gray-400 mr-2">🔍</span>
        <input 
          type="text" 
          placeholder="Search for properties, owners, addresses..." 
          className="bg-transparent border-none outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-5">
        <span className="cursor-pointer">📋</span>
        <span className="cursor-pointer">🔔</span>
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  );
}
