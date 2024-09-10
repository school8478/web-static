'use client'

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function SignDropLink() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null; // 또는 로딩 인디케이터를 표시할 수 있습니다.
  }

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <Link href="/sign/drop">
      회원탈퇴
    </Link>
  );
}