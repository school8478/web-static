import axios from 'axios';
import type { User } from "@/types";

const API_URL = process.env.API_URL || 'http://localhost:5000';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const users: User[] = await response.json();
  return users.map((user) => ({
    ...user,
    id: Number(user.id)
  }));
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await response.json();
  return {
    ...user,
    id: Number(user.id)
  };
}

export async function signUpUser(email: string, password: string): Promise<User | null> {
  try {
    const checkResponse = await axios.get(`${API_URL}/users?email=${email}`);
    if (checkResponse.data.length > 0) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const response = await axios.post(`${API_URL}/users`, { email, password });
    const newUser = response.data;
    return {
      ...newUser,
      id: Number(newUser.id)
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Sign up error:', error.response?.data);
      throw new Error(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
    throw error;
  }
}

export async function deleteUser(id: number): Promise<boolean> {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return true;
  } catch (error) {
    console.error('회원탈퇴 오류:', error);
    return false;
  }
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      const user = response.data[0];
      return {
        ...user,
        id: Number(user.id)
      };
    }
    return null;
  } catch (error) {
    console.error('로그인 오류:', error);
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem('currentUser');
}

export function setCurrentUser(user: User): void {
  localStorage.setItem('currentUser', JSON.stringify({
    ...user,
    id: Number(user.id)
  }));
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user.id && user.email) {
          return {
            ...user,
            id: Number(user.id)
          };
        }
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
      }
    }
    localStorage.removeItem('currentUser');
  }
  return null;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data.map((user) => ({
      ...user,
      id: Number(user.id)
    }));
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    throw error;
  }
}

export function isAdmin(email: string): boolean {
  return email === 'admin@example.com';
}