import { RegisterForm } from '@/components/AuthForms';

export default function RegisterPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <RegisterForm />
    </div>
  );
}