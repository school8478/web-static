'use client';

import React, { useEffect, useState } from 'react';
import type { User } from "@/types";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import SignDropLink from "@components/signDropLink";
import AdminLink from "@components/adminLink";
import LogoutLink from "@components/logOutLink";

import styles from "@css/page.module.css";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const user = getCurrentUser();
      setCurrentUser(user);
    };

    checkUser();
    const interval = setInterval(checkUser, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className={styles.header}>
      <section className={styles.secHeader}>
        <article>
          <div className={styles.logo}>로고</div>
          <nav>
            {!currentUser && (
              <>
                <Link href="/sign/up" className="mr-4 text-blue-500 hover:underline">
                  회원가입
                </Link>
                <Link href="/log" className="mr-4 text-blue-500 hover:underline">
                  로그인
                </Link>
              </>
            )}
            {currentUser && (
              <>
                <AdminLink />
                <SignDropLink />
                <LogoutLink />
              </>
            )}
          </nav>
        </article>
        <article>
          <nav>
            <Link href="/">홈</Link>
            <Link href="/board">게시판</Link>
          </nav>
        </article>
      </section>      
    </header>
  );
}
