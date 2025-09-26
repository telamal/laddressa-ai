'use client';

import { useState } from 'react';
import { searchBusinesses, BusinessSearchParams, Business, POPULAR_INDUSTRIES, COUNTRY_CODES } from '@/lib/businessApi';

interface BusinessSearchProps {
  onResults: (businesses: Business[]) => void;
  onLoading: (loading: boolean) => void;
}

export default function BusinessSearch({ onResults, onLoading }: BusinessSearchProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('us');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query && !selectedIndustry) {
      alert('Please enter a search query or select an industry');
      return;
    }

    onLoading(true);

    const params: BusinessSearchParams = {
      query: selectedIndustry || query,
      location: location,
      region: region,
      language: 'en',
      limit: 20
    };

    try {
      const result = await searchBusinesses(params);
      onResults(result.businesses);
    } catch (error) {
      console.error('Search failed:', error);
      onResults([]);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Find Local Businesses</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Query */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., pizza, hair salon, dentist"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, London, Paris"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Industry Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popular Industries
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an industry...</option>
              {POPULAR_INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Country/Region Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country/Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(COUNTRY_CODES).map(([country, code]) => (
                <option key={code} value={code}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            🚀 Search Businesses
          </button>
        </div>
      </form>
    </div>
  );
}