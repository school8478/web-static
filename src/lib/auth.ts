export interface User {
  id: string;
  email: string;
  password: string;
}

export function signUpUser(email: string, password: string): User | null {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some((user: User) => user.email === email)) {
    throw new Error('이미 존재하는 이메일입니다.');
  }
  const newUser: User = { id: Date.now().toString(), email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
}

export function deleteUser(userId: string): boolean {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.filter((user: User) => user.id !== userId);
  
  if (users.length === updatedUsers.length) {
    return false; // 사용자를 찾지 못함
  }

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  localStorage.removeItem('currentUser');
  return true;
}

export function loginUser(email: string, password: string): User | null {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
  
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser(): User | null {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
}
  
export function setCurrentUser(user: User): void {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getAllUsers(): User[] {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.map((user: User) => ({ ...user, password: '******' })); // 비밀번호는 숨깁니다
}

export function isAdmin(email: string): boolean {
  // 여기서는 간단히 특정 이메일을 관리자로 지정합니다
  return email === 'admin@example.com';
}