"use client";

import Header from '@/components/layout/Header';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-[#f5f7fa] p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
