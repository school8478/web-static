'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';

export default function LogoutLink() {
    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logoutUser();
        alert('로그아웃되었습니다.');
        router.push('/');
    };

    return (
        <Link href="/logout" onClick={handleLogout} className="mr-4 text-blue-500 hover:underline">
            로그아웃
        </Link>
    );
}