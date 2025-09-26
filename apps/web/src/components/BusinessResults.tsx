'use client';

import { Business } from '@/lib/businessApi';

interface BusinessResultsProps {
  businesses: Business[];
  loading: boolean;
}

export default function BusinessResults({ businesses, loading }: BusinessResultsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Searching for businesses...</p>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600 text-lg">No businesses found. Try a different search query or location.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        🏢 Found {businesses.length} Business{businesses.length > 1 ? 'es' : ''}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <div key={business.business_id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="mb-3">
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                {business.name}
              </h4>
              <p className="text-sm text-gray-600">{business.category}</p>
            </div>

            {business.rating && (
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(business.rating!) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {business.rating.toFixed(1)}
                  {business.reviews_count && ` (${business.reviews_count} reviews)`}
                </span>
              </div>
            )}

            <div className="space-y-1 text-sm text-gray-600">
              {business.address && (
                <p className="flex items-start">
                  <span className="mr-2">📍</span>
                  {business.address}
                </p>
              )}

              {business.phone && (
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                    {business.phone}
                  </a>
                </p>
              )}

              {business.website && (
                <p className="flex items-center">
                  <span className="mr-2">🌐</span>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    Visit Website
                  </a>
                </p>
              )}

              {business.hours && (
                <p className="flex items-start">
                  <span className="mr-2">🕒</span>
                  {business.hours}
                </p>
              )}
            </div>

            {business.photos && business.photos.length > 0 && (
              <div className="mt-3">
                <img
                  src={business.photos[0]}
                  alt={business.name}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}