import { SignUpForm } from '@components/authForms';

import styles from "@css/page.module.css";

export default function SignUpPage() {
  return (
    <main className={styles.signUp}>
      <h1>로그인</h1>
      <SignUpForm />
    </main>
  );
}