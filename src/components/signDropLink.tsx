'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@lib/auth';

export default function SignDropLink() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Link href="/sign/drop">
      회원탈퇴
    </Link>
  );
}