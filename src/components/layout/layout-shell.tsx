"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  // 인증 페이지는 사이드바 없이 표시
  const isAuthPage =
    pathname?.startsWith("/signin") || pathname?.startsWith("/signup");

  if (isAuthPage) {
    return <div className="min-h-dvh flex flex-col">{children}</div>;
  }

  // 메인 앱 레이아웃 (사이드바 + 헤더 + 푸터)
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
