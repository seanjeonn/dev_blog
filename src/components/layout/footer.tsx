import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t flex justify-center px-4">
      <div className="container py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dev Blog. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              개인정보처리방침
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:text-foreground">
              이용약관
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:text-foreground">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
