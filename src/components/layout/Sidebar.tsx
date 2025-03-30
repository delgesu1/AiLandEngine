"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Parcel Finder', path: '/parcel-finder', icon: '🔍' },
    { name: 'Buy Box Filter', path: '/buy-box-filter', icon: '⚙️' },
    { name: 'GIS Data', path: '/gis-data', icon: '🗺️' },
    { name: 'Utilities', path: '/utilities', icon: '🔌' },
    { name: 'Entitlements', path: '/entitlements', icon: '📜' },
    { name: 'Impact Fees', path: '/impact-fees', icon: '💰' },
    { name: 'Market Intelligence', path: '/market-intelligence', icon: '📈' },
    { name: 'Owner Outreach', path: '/owner-outreach', icon: '👥' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="bg-[#1a2233] text-white w-60 flex-shrink-0 h-screen flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-white/10 mb-5">
        AI Land Engine
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center gap-3 px-5 py-3 hover:bg-white/10 transition-colors ${
              pathname === item.path ? 'bg-white/10' : ''
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
