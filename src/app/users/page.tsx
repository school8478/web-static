'use client'

import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import { getAllUsers, getCurrentUser, isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const currentUser = getCurrentUser();
      if (!currentUser || !isAdmin(currentUser.email)) {
        alert('관리자만 접근할 수 있습니다.');
        router.push('/');
        return;
      }

      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('사용자 목록을 가져오는 중 오류 발생:', error);
        setError('사용자 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>회원 목록</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;