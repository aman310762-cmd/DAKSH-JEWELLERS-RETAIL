'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/daksh-manage-2024', icon: 'grid' },
  { label: 'Products', href: '/daksh-manage-2024/products', icon: 'box' },
  { label: 'Add Product', href: '/daksh-manage-2024/products/new', icon: 'plus' },
  { label: 'Orders', href: '/daksh-manage-2024/orders', icon: 'clipboard' },
];

const icons: Record<string, React.ReactNode> = {
  grid: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  box: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  plus: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M12 4v16m-8-8h16" /></svg>,
  clipboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = 'adminToken=; path=/; max-age=0';
    router.push('/daksh-manage-2024/login');
  };

  const isActive = (href: string) => {
    if (href === '/daksh-manage-2024') return pathname === href;
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[#222]">
        <Link href="/daksh-manage-2024" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C9A84C] rounded flex items-center justify-center">
            <span className="text-[#111] font-bold text-sm">DJ</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-wider">DAKSH</p>
            <p className="text-[10px] text-[#C9A84C] tracking-[0.3em]">ADMIN</p>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
              isActive(item.href)
                ? 'bg-[#1a1a1a] text-[#C9A84C] border-l-2 border-[#C9A84C]'
                : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            {icons[item.icon]}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#222]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#888] hover:text-red-400 hover:bg-[#1a1a1a] transition-all w-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] min-h-screen bg-[#111] fixed left-0 top-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#111] h-14 flex items-center justify-between px-4 border-b border-[#222]">
        <Link href="/daksh-manage-2024" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#C9A84C] rounded flex items-center justify-center">
            <span className="text-[#111] font-bold text-xs">DJ</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-wider">ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[260px] bg-[#111] flex flex-col">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}
