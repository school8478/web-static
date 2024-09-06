'use client'

import { useState, useEffect } from 'react';
import { User } from '@/types'; 
import { useRouter } from 'next/navigation';
import { registerUser, loginUser, logoutUser, setCurrentUser, getCurrentUser } from '@/lib/auth';

export function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = registerUser(email, password);
        if (user) {
            alert('회원가입이 완료되었습니다.');
            router.push('/');
        } else {
            alert('이미 존재하는 이메일입니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
            />
            <button type="submit">회원가입</button>
        </form>
    );
}

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = loginUser(email, password);
        if (user) {
            setCurrentUser(user);
            alert('로그인되었습니다.');
            router.push('/');
        } else {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
            />
            <button type="submit">로그인</button>
        </form>
    );
}

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        alert('로그아웃되었습니다.');
        router.push('/');
    };

    return <button onClick={handleLogout}>로그아웃</button>;
}

export function AuthStatus() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        setCurrentUser(getCurrentUser());
    }, []);

    return (
        <div>
            {currentUser ? `${currentUser.email}님 환영합니다.` : '로그인되지 않았습니다.'}
        </div>
    );
}