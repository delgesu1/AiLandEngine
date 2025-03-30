"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to AI Land Engine</h1>
          <p className="text-xl text-gray-600 mb-8">
            A professional platform for land acquisition specialists
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link href="/parcel-finder" className="btn btn-outline">
              Explore Parcels
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
