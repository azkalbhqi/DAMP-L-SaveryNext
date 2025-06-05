'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/app/utils/Sidebar';

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hideSidebarPaths = ['/login', '/register'];

  if (hideSidebarPaths.includes(pathname)) return null;

  return <Sidebar />;
}
