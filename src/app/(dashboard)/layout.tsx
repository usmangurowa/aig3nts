import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/user-dropdown";
import { SettingsPanelProvider } from "@/components/settings-panel";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="h-svh">
      <AppSidebar />
      <SidebarInset className="bg-sidebar group/sidebar-inset">
        <header className="dark flex h-16 shrink-0 items-center gap-2 px-4 md:px-6 lg:px-8 bg-sidebar text-sidebar-foreground relative before:absolute before:inset-y-3 before:-left-px before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/15 before:to-white/5 before:z-50">
          <SidebarTrigger className="-ms-2" />
          <div className="flex items-center gap-8 ml-auto">
            <UserDropdown />
          </div>
        </header>
        <SettingsPanelProvider>
          <div className="flex flex-grow h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300 ">
            {children}
          </div>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
