'use client';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { signUpUser, loginUser, logoutUser, deleteUser, setCurrentUser, getCurrentUser } from '@lib/auth';
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
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            if (user) {
                setCurrentUser(user);
                alert('로그인되었습니다.');
                router.push('/');
            } else {
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
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

export function LogoutForm() {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        alert('로그아웃되었습니다.');
        router.push('/');
    };

    return <ButtonField type="button" className="btn-basic" onClick={handleLogout}>로그아웃</ButtonField>;
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

export function SignDropForm() {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.id) {
            alert('로그인 상태를 확인할 수 없습니다.');
            return;
        }

        const confirmed = window.confirm('정말로 회원탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            const success = await deleteUser(currentUser.id);
            if (success) {
                alert('회원탈퇴가 완료되었습니다.');
                logoutUser();
                router.push('/');
            } else {
                alert('회원탈퇴에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('회원탈퇴 오류:', error);
            alert('회원탈퇴 중 오류가 발생했습니다.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <ButtonField 
            type="button" 
            className="btn-basic" 
            onClick={handleDeleteAccount}
            disabled={isDeleting}
        >
            {isDeleting ? '처리 중...' : '회원탈퇴'}
        </ButtonField>
    );
}