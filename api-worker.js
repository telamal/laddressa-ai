// Cloudflare Worker for Laddressa.ai API
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Search endpoint
    if (url.pathname === '/api/search' && request.method === 'POST') {
      const { address } = await request.json();
      
      // Call RapidAPI
      const rapidApiResponse = await fetch(
        'https://local-business-search.p.rapidapi.com/business-posts?business_id=0x880fd393d427a591%3A0x8cba02d713a995ed&region=us&language=en',
        {
          headers: {
            'x-rapidapi-host': 'local-business-search.p.rapidapi.com',
            'x-rapidapi-key': '80f60ed0a9mshe8e73fb42c00c33p15bca5jsn295aaf5c4976'
          }
        }
      );
      
      const data = await rapidApiResponse.json();
      
      return new Response(JSON.stringify({
        success: true,
        address: address,
        data: data
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};
