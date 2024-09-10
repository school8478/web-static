import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "LOCAL WEB SITE",
  description: "LOCAL WEB SITE : 회원가입 / 회원탈퇴 / 로그인 / 로그아웃 / 게시판 목록 / 게시판 상세 / 게시판 작성 / 게시판 수정 / 게시판 삭제 기능",
  icons: {
    icon: "/favicon/favicon.ico"    
  }
};

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { SessionProvider } from "@components/sessionProvider";

import Header from "@common/header";
import Footer from "@common/footer";

import "@css/globals.css";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ko">
      <body>
        <Header />
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  )
}
