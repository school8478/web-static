import { getPosts } from '@/lib/board';
import { PostForms } from '@components/postForms';

export default async function BoardPage() {
  try {
    const posts = await getPosts();
    return <PostForms initialPosts={posts} />;
  } catch (error: unknown) {
    console.error('게시글 목록을 가져오는데 실패했습니다:', error);
    return <div>게시글을 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>;
  }
}