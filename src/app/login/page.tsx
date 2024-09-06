import { LoginForm } from '@/components/AuthForms';

export default function LoginPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <LoginForm />
    </div>
  );
}