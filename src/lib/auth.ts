'use client';
import axios from 'axios';

const API_URL = 'http://localhost:9999';

export interface User {
  id: string;
  email: string;
  password: string;
}

export async function signUpUser(email: string, password: string): Promise<User | null> {
  try {
    const checkResponse = await axios.get(`${API_URL}/users?email=${email}`);
    if (checkResponse.data.length > 0) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const response = await axios.post(`${API_URL}/users`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Sign up error:', error.response?.data);
      throw new Error(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
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
      return response.data[0];
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
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user.id && user.email) {
          return user;
        }
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
      }
    }
    // 유효하지 않은 데이터인 경우 로컬 스토리지에서 제거
    localStorage.removeItem('currentUser');
  }
  return null;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    throw error;
  }
}

export function isAdmin(email: string): boolean {
  // 여기서는 간단히 특정 이메일을 관리자로 지정합니다
  return email === 'admin@example.com';
}