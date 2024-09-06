import { useEffect, useState } from 'react';
import { getCurrentUser, isAdmin } from '@/lib/auth';

export function useAdminCheck(): boolean | null {
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      const currentUser = await getCurrentUser();
      setIsAdminUser(currentUser ? isAdmin(currentUser.email) : false);
    }
    checkAdmin();
  }, []);

  return isAdminUser;
}