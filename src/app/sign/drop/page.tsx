'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteUser, getCurrentUser } from '@/lib/auth';

export default function SignOutPage(): JSX.Element {
const [isLoading, setIsLoading] = useState<boolean>(false)
const router = useRouter()

const handleSignOut = async (): Promise<void> => {
  if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
  setIsLoading(true)
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
    throw new Error('로그인된 사용자를 찾을 수 없습니다.')
  }

  const success = deleteUser(currentUser.id)
  if (success) {
  alert('회원탈퇴가 완료되었습니다.')
  router.push('/')
  } else {
  throw new Error('회원탈퇴 처리 중 오류가 발생했습니다.')
  }
  } catch (error) {
  console.error('Error:', error)
  alert((error as Error).message)
  } finally {
  setIsLoading(false)
  }
  }
}

return (
<div>
<h1>회원탈퇴</h1>
<p>회원탈퇴를 진행하시려면 아래 버튼을 클릭해주세요.</p>
<button onClick={handleSignOut} disabled={isLoading}>
{isLoading ? '처리 중...' : '회원탈퇴'}
</button>
</div>
)
}