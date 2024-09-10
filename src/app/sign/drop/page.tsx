import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SignDropWrapper = dynamic(() => import('@components/signDropClient'), {
  ssr: false,
});

export default function SignDropPage() {
  return (
    <div>
      <h1>회원 탈퇴</h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <SignDropWrapper />
      </Suspense>
    </div>
  );
}