import SignDropLink from "@components/signDropLink";
import AdminLink from "@components/adminLink";
import { AuthStatus } from "@components/authForms";
import Link from "next/link";

import styles from "@css/page.module.css";

export default function Main() {
  return (
    <main className={styles.main}>
      <h1>메인</h1>

      <AuthStatus />

      <div>
        <Link href="/sign/up">
          회원가입
        </Link>
        <Link href="/log">
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
