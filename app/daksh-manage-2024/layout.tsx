'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/daksh-manage-2024/login';

  // Login page gets no sidebar — standalone dark layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <AdminSidebar />
      <main className="lg:ml-[240px] min-h-screen pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
