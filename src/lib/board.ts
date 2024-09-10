import type { Post } from '@/types';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/boards`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data: Post[] = await response.json();
  return data.map((post) => ({
    ...post,
    id: Number(post.id)
  }));
}

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/boards/${id}`);
  if (!response.ok) {
    throw new Error('게시글을 가져오는데 실패했습니다');
  }
  const post = await response.json();
  return {
    ...post,
    id: Number(post.id)
  };
}
export async function createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  const response = await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...post,
      createdAt: new Date().toISOString()
    }),
  });
  if (!response.ok) {
    throw new Error('게시글 작성에 실패했습니다');
  }
  const createdPost = await response.json();
  return {
    ...createdPost,
    id: Number(createdPost.id)
  };
}

export async function updatePost(id: number, post: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post> {
  const response = await fetch(`${API_URL}/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error('게시글 수정에 실패했습니다');
  }
  const updatedPost = await response.json();
  return {
    ...updatedPost,
    id: Number(updatedPost.id)
  };
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/boards/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('게시글 삭제에 실패했습니다');
  }
}