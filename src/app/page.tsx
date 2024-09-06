import Link from 'next/link';
import { AuthStatus } from '@components/AuthForms';
import AdminLink from '@components/AdminLink';

export default function Main() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">인증 예제</h1>
      <AuthStatus />
      
      <div className="mt-4">
        <Link href="/register" className="mr-4 text-blue-500 hover:underline">
          회원가입
        </Link>
        <Link href="/login" className="mr-4 text-blue-500 hover:underline">
          로그인
        </Link>
        <AdminLink />
      </div>
    </main>
  );
}