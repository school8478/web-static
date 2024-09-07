'use client'

import { useState, useEffect } from 'react';
import { User } from '@/types'; 
import { useRouter } from 'next/navigation';
import { signUpUser, loginUser, logoutUser, setCurrentUser, getCurrentUser } from '@lib/auth';
import InputField from '@components/field/InputField';
import ButtonField from '@components/field/buttonField';

export function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signUpUser(email, password);
            if (user) {
                alert('회원가입이 완료되었습니다.');
                router.push('/');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type="email"
                name="inp-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                className="inp-basic"
                required
            />
            <InputField
                type="password"
                name="inp-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="inp-basic"
                required
            />
            <ButtonField type="submit" className="btn-basic">회원가입</ButtonField>
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
            <InputField
                type="email"
                name="inp-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                className="inp-email"
                required
            />
            <InputField
                type="password"
                name="inp-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="inp-password"
                required
            />
            <ButtonField type="submit" className="btn-basic">로그인</ButtonField>
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

    return <ButtonField type="button" className="btn-basic" onClick={handleLogout} disabled>로그아웃</ButtonField>;
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