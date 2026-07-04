import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LayoutShellProps = {
  children: React.ReactNode;
  locale: Locale;
  dict: Dictionary;
};

export default function LayoutShell({
  children,
  locale,
  dict,
}: LayoutShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
