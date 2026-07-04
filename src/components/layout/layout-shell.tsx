import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
