import { NextResponse } from 'next/server';
import { signUpUser } from "@/lib/auth";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try {
        const user = await signUpUser(email, password);
        return NextResponse.json({ user });
    } catch (error) {
        console.error('회원가입 오류:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}