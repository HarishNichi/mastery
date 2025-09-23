
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bot, Code, Library, Menu, Feather } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import * as React from 'react';

const navItems = [
  { href: '/', label: 'Learning Paths', icon: Library },
  { href: '/tutor', label: 'AI Tutor', icon: Bot },
  { href: '/challenges', label: 'Code Challenges', icon: Code },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const sidebarContent = (
    <>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 font-headline text-lg font-semibold text-primary"
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <Feather className="h-6 w-6" />
          <span>Mastery Tracks</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={{ children: item.label, side: 'right' }}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );

  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
            <nav className="flex w-full items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 font-headline text-lg font-semibold"
              >
                <Feather className="h-6 w-6 text-primary" />
                <span className="sr-only">Mastery Tracks</span>
              </Link>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <div className="flex h-full flex-col">{sidebarContent}</div>
                </SheetContent>
              </Sheet>
            </nav>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" side="left" collapsible="icon">
        {sidebarContent}
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
