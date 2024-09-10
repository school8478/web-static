import { Post } from '@/types';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export async function getServerSidePosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/boards`);
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('게시글 목록을 가져오는데 실패했습니다:', error);
    throw new Error('게시글 목록을 가져오는데 실패했습니다');
  }
}