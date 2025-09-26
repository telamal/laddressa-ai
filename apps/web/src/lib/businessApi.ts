// Business API integration for local business search
export interface BusinessSearchParams {
  query?: string;
  location?: string;
  region?: string;
  language?: string;
  limit?: number;
}

export interface Business {
  business_id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews_count?: number;
  category: string;
  hours?: string;
  photos?: string[];
}

export interface BusinessSearchResponse {
  businesses: Business[];
  total: number;
  status: string;
}

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '80f60ed0a9mshe8e73fb42c00c33p15bca5jsn295aaf5c4976';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'local-business-search.p.rapidapi.com';

export async function searchBusinesses(params: BusinessSearchParams): Promise<BusinessSearchResponse> {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append('query', params.query);
  if (params.location) searchParams.append('location', params.location);
  if (params.region) searchParams.append('region', params.region || 'us');
  if (params.language) searchParams.append('language', params.language || 'en');
  if (params.limit) searchParams.append('limit', params.limit.toString());

  const url = `https://${RAPIDAPI_HOST}/business-search?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      businesses: data.businesses || [],
      total: data.total || 0,
      status: 'success'
    };
  } catch (error) {
    console.error('Business search error:', error);
    return {
      businesses: [],
      total: 0,
      status: 'error'
    };
  }
}

export async function getBusinessPosts(businessId: string, region: string = 'us', language: string = 'en') {
  const url = `https://${RAPIDAPI_HOST}/business-posts?business_id=${encodeURIComponent(businessId)}&region=${region}&language=${language}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Business posts error:', error);
    return { posts: [], status: 'error' };
  }
}

// Popular industries/categories for search suggestions
export const POPULAR_INDUSTRIES = [
  'restaurants',
  'hotels',
  'retail stores',
  'automotive',
  'healthcare',
  'beauty & spas',
  'home services',
  'professional services',
  'entertainment',
  'fitness & gyms',
  'real estate',
  'financial services'
];

// Country codes for global search
export const COUNTRY_CODES = {
  'United States': 'us',
  'Canada': 'ca',
  'United Kingdom': 'uk',
  'Australia': 'au',
  'Germany': 'de',
  'France': 'fr',
  'Spain': 'es',
  'Italy': 'it',
  'Japan': 'jp',
  'Brazil': 'br',
  'Mexico': 'mx',
  'India': 'in'
};