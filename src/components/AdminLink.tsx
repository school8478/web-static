'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, isAdmin } from '@lib/auth';

export default function AdminLink() {
    const [showAdminLink, setShowAdminLink] = useState(false);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser && isAdmin(currentUser.email)) {
            setShowAdminLink(true);
        }
    }, []);

    if (!showAdminLink) return null;

    return (
        <Link href="/users">
            회원 목록
        </Link>
    );
}