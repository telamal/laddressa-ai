'use client';

import { useState } from 'react';
import BusinessSearch from '@/components/BusinessSearch';
import BusinessResults from '@/components/BusinessResults';
import { Business } from '@/lib/businessApi';

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = (results: Business[]) => {
    setBusinesses(results);
    setHasSearched(true);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🚀 Laddrressa.ai - LIVE NOW
          </h1>
          <p className="text-2xl text-blue-600 font-semibold mb-2">
            Global Business Discovery Platform
          </p>
          <p className="text-lg text-gray-600">
            Search businesses worldwide - Version 2.0 - {new Date().toLocaleString()}
          </p>
        </div>

        {/* Search Component */}
        <BusinessSearch
          onResults={handleResults}
          onLoading={handleLoading}
        />

        {/* Results Component */}
        {(hasSearched || loading) && (
          <BusinessResults
            businesses={businesses}
            loading={loading}
          />
        )}

        {/* Getting Started Section */}
        {!hasSearched && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🚀 Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold mb-2">Search Globally</h3>
                <p className="text-gray-600 text-sm">
                  Find businesses in any country using our global database
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏢</div>
                <h3 className="font-semibold mb-2">All Industries</h3>
                <p className="text-gray-600 text-sm">
                  From restaurants to retail, healthcare to hospitality
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-600 text-sm">
                  Smart search with real-time business information
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Powered by RapidAPI Local Business Search
            </div>
          </div>
        )}
      </div>
    </main>
  );
}