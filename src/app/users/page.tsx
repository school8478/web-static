'use client'

import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import { getAllUsers } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAdminCheck } from '@/hooks/useAdminCheck';

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
    }

    if (isAdmin !== null) {
      fetchUsers();
    }
  }, [isAdmin, router]);

  if (isAdmin === null || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">회원 목록</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">이메일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;