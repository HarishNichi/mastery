import { AppShell } from '@/components/app-shell';

export default function AppPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
