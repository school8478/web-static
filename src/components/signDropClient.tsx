'use client';

import { useSession } from 'next-auth/react';
import { SignDropForm } from './authForms';

export default function SignDropClient() {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  return <SignDropForm />;
}