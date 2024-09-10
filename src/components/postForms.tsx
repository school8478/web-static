'use client';

import { useState } from 'react';
import { SessionProvider, useSession } from "next-auth/react";
import type { Post } from '@/types';
import { getPost, createPost } from '@/lib/board';
import SelectField from '@components/field/selectField';
import InputField from '@components/field/inputField';
import TextAreaField from '@components/field/textAreaField';
import ButtonField from '@components/field/buttonField';

export function PostForms({ initialPosts }: { initialPosts: Post[] | null }) {
    return (
        <SessionProvider>
            <PostFormsContent initialPosts={initialPosts} />
        </SessionProvider>
    );
}

function PostFormsContent({ initialPosts }: { initialPosts: Post[] | null }) {
    const { data: session } = useSession();
    const [view, setView] = useState<'list' | 'detail' | 'form'>('list');
    const [posts, setPosts] = useState<Post[]>(initialPosts?.map(post => ({
        ...post,
        id: Number(post.id)
    })) || []);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handlePostSelect(id: number) {
        setIsLoading(true);
        try {
            const post = await getPost(id);
            setSelectedPost(post);
            setView('detail');
        } catch (error) {
            console.error('게시글을 불러오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleNewPost() {
        setView('form');
    }

    function handleBackToList() {
        setView('list');
        setSelectedPost(null);
    }

    async function handleCreatePost(newPost: Omit<Post, 'id' | 'createdAt'>) {
        setIsLoading(true);
        try {
            const postWithAuthor = {
                ...newPost,
                author: session?.user?.email || '익명 사용자'
            };
            const createdPost = await createPost(postWithAuthor);
            setPosts(prevPosts => [{...createdPost, id: Number(createdPost.id)}, ...prevPosts]);
            setView('list');
        } catch (error) {
            console.error('게시글 작성 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <>
            {view === 'list' && (
                <PostList 
                    posts={posts} 
                    onPostSelect={handlePostSelect} 
                    onNewPost={handleNewPost} 
                />
            )}
            {view === 'detail' && selectedPost && (
                <PostDetail 
                    post={selectedPost} 
                    onBackToList={handleBackToList} 
                />
            )}
            {view === 'form' && (
                <PostForm 
                    onSubmit={handleCreatePost} 
                    onCancel={handleBackToList}
                    userEmail={session?.user?.email}
                />
            )}
        </>
    );
}

function PostList({ posts, onPostSelect, onNewPost }: { 
    posts: Post[], 
    onPostSelect: (id: number) => void, 
    onNewPost: () => void 
}) {
    return (
        <div>
            <h2>게시글 목록</h2>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} onClick={() => onPostSelect(post.id)}>
                            {post.title} - {post.author} ({new Date(post.createdAt).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>게시글이 없습니다.</p>
            )}
            <ButtonField type="button" className="btn-basic" onClick={onNewPost}>
                새 게시글 작성
            </ButtonField>
        </div>
    );
}

function PostDetail({ post, onBackToList }: { 
    post: Post, 
    onBackToList: () => void 
}) {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>작성자: {post.author}</p>
            <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
            <div>{post.content}</div>
            <ButtonField type="button" className="btn-basic" onClick={onBackToList}>
                목록으로
            </ButtonField>
        </div>
    );
}

function PostForm({ onSubmit, onCancel, userEmail }: { 
    onSubmit: (post: Omit<Post, 'id' | 'createdAt'>) => void, 
    onCancel: () => void,
    userEmail?: string | null
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            category,
            title,
            content,
            author: userEmail || '익명 사용자',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>새 게시글 작성</h2>
            <SelectField
                name="sel-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                    { value: 'notice', label: '공지사항' },
                    { value: 'free', label: '자유게시판' },
                    { value: 'question', label: '질문과 답변' }
                ]}
                placeholder="카테고리"
                className="sel-basic"
                required
            />
            <InputField
                type="text"
                name="inp-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                className="inp-basic"
                required
            />
            <TextAreaField
                name="inp-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
                className="area-basic"
                required
            />
            <ButtonField type="submit" className="btn-basic">게시글 작성</ButtonField>
            <ButtonField type="button" className="btn-basic" onClick={onCancel}>
                취소
            </ButtonField>
        </form>
    );
}