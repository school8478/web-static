import SignDropLink from "@/components/signDropLink";
import AdminLink from "@components/AdminLink";
import { AuthStatus } from "@components/AuthForms";
import Link from "next/link";

export default function Main() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">인증 예제</h1>
      <AuthStatus />

      <div className="mt-4">
        <Link href="/sign/up" className="mr-4 text-blue-500 hover:underline">
          회원가입
        </Link>
        <Link href="/log" className="mr-4 text-blue-500 hover:underline">
          로그인
        </Link>
        <AdminLink />
        <SignDropLink />
      </div>
      <div>
          <h1>hello next world!</h1>
        </div>
    </main>
  );
}
