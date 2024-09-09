import { LoginForm } from '@components/authForms';
import styles from "@css/page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.logIn}>
      <h1>로그인</h1>
      <LoginForm />
    </main>
  );
}
