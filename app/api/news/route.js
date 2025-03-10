import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get('category') || 'technology';
    const language = searchParams.get('language') || 'en' || "es"; // both languages are supported
    const pageSize = searchParams.get('pageSize') || 30; 
    const searchQuery = searchParams.get('q') || '';
    
    let endpoint = 'top-headlines';
    let params = {
      category,
      language,
      pageSize,
    };
    
    // If there's a search query, use the everything endpoint
    if (searchQuery) {
      endpoint = 'everything';
      params = {
        q: searchQuery,
        language,
        pageSize,
        sortBy: 'publishedAt'
      };
    }
    
    const response = await axios.get(`https://newsapi.org/v2/${endpoint}`, {
      params,
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_NEWS_API_KEY 
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching news data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}
