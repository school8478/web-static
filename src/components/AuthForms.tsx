'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import InputField from '@components/field/inputField';
import ButtonField from '@components/field/buttonField';

export function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('회원가입이 완료되었습니다.');
                router.push('/login');
            } else {
                alert(data.error || '회원가입 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type="text"
                name="inp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                className="inp-basic"
                required
            />
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
            <ButtonField type="submit" className="btn-basic" disabled={isLoading}>
                {isLoading ? '처리 중...' : '회원가입'}
            </ButtonField>
        </form>
    );
}

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                alert(result.error);
            } else {
                alert('로그인되었습니다.');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
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
            <ButtonField type="submit" className="btn-basic" disabled={isLoading}>
                {isLoading ? '처리 중...' : '로그인'}
            </ButtonField>
        </form>
    );
}

export function LogoutForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut({ redirect: false });
            alert('로그아웃되었습니다.');
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('로그아웃 오류:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ButtonField 
            type="button" 
            className="btn-basic" 
            onClick={handleLogout}
            disabled={isLoading}
        >
            {isLoading ? '처리 중...' : '로그아웃'}
        </ButtonField>
    );
}

export function AuthStatus() {
    const { data: session } = useSession();

    return (
        <div>
            {session?.user ? `${session.user.email}님 환영합니다.` : '로그인되지 않았습니다.'}
        </div>
    );
}

export function SignDropForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        if (!session?.user?.id) {
            alert('로그인 상태를 확인할 수 없습니다.');
            return;
        }

        const confirmed = window.confirm('정말로 회원탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch('/api/auth/delete-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: session.user.id }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('회원탈퇴가 완료되었습니다.');
                await signOut({ redirect: false });
                router.push('/');
                router.refresh();
            } else {
                alert(data.error || '회원탈퇴에 실패했습니다. 다시 시도해 주세요.');
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