import profile from "../../../public/profile.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation data
const data = {
  navMain: [
    {
      title: "홈",
      url: "/",
      icon: "🏠",
    },
    {
      title: "포스트",
      url: "/posts",
      icon: "📝",
    },
    {
      title: "프로젝트",
      url: "/projects",
      icon: "🚀",
    },
    {
      title: "About",
      url: "/about",
      icon: "👋",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentLocation = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 px-4 py-4">
          <div className="flex w-25 items-center justify-center mb-2">
            <Image
              src={profile}
              alt="Bongsik Dev"
              className="object-cover rounded-xl border-2"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">개발 블로그</span>
            <span className="text-xs text-muted-foreground">Bongsik Dev</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      currentLocation === item.url
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        : ""
                    }
                  >
                    <Link href={item.url}>
                      <span className="mr-1">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
