"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white h-15 border-b border-gray-200 flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-bold text-lg text-[#3366ff]">
          AI Land Engine
        </Link>
        
        <div className="flex items-center space-x-5">
          <Link 
            href="/dashboard" 
            className={`font-medium text-sm ${pathname === '/dashboard' ? 'text-[#3366ff]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/parcel-finder" 
            className={`font-medium text-sm ${pathname === '/parcel-finder' ? 'text-[#3366ff]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Parcel Finder
          </Link>
          <Link 
            href="/buy-box-filter" 
            className={`font-medium text-sm ${pathname === '/buy-box-filter' ? 'text-[#3366ff]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Buy Box
          </Link>
          <Link 
            href="/owner-outreach" 
            className={`font-medium text-sm ${pathname === '/owner-outreach' ? 'text-[#3366ff]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Owner Outreach
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#f5f7fa] rounded-lg px-4 py-2 w-[300px]">
          <span className="text-gray-400 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Search for properties, addresses..." 
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
        
        <div className="flex items-center gap-5">
          <span className="cursor-pointer">📋</span>
          <span className="cursor-pointer">🔔</span>
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
