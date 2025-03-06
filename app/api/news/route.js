import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get('category') || 'technology';
    const language = searchParams.get('language') || 'en';
    const pageSize = searchParams.get('pageSize') || 8;
    
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        language,
        pageSize,
      },
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
