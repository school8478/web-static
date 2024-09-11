import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { deleteUser } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const { userId } = await req.json();
    if (session.user.email !== userId) {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    try {
        const success = await deleteUser(userId);
        if (success) {
            return NextResponse.json({ message: '회원 탈퇴가 완료되었습니다.' });
        } else {
            return NextResponse.json({ error: '회원 탈퇴에 실패했습니다.' }, { status: 500 });
        }
    } catch (error) {
        console.error('회원 탈퇴 오류:', error);
        return NextResponse.json({ error: '회원 탈퇴 중 오류가 발생했습니다.' }, { status: 500 });
    }
}