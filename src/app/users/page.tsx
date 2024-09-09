'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import { getAllUsers } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAdminCheck } from '@/hooks/useAdminCheck';

import styles from "@css/page.module.css";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const isAdmin = useAdminCheck();

  useEffect(() => {
    async function fetchUsers() {
      if (isAdmin === false) {
        alert('관리자만 접근할 수 있습니다.');
        router.push('/');
        return;
      }

      if (isAdmin === true) {
        try {
          const fetchedUsers = await getAllUsers();
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('사용자 목록을 가져오는 중 오류 발생:', error);
          alert('사용자 목록을 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAdmin !== null) {
      fetchUsers();
    };
  }, [isAdmin, router]);

  if (isAdmin === null || loading) {
    return <div>Loading...</div>;
  };

  return (
    <main className={styles.adminUsers}>
      <h1>회원 목록</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
        {
          users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </main>
  );
};

export default UsersPage;