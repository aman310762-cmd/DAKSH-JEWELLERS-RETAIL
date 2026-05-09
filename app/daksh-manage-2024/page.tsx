'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import OrderTable from '@/components/admin/OrderTable';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  todayOrders: number;
}

interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
  items: { name: string; weight: string; purity: string; qty: number }[];
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalOrders: 0, pendingOrders: 0, todayOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const token = localStorage.getItem('adminToken') || '';
        const res = await fetch(`${apiUrl}/api/admin/dashboard/stats`, {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setRecentOrders(data.recentOrders || []);
        }
      } catch { /* Demo mode */ }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('adminToken') || '';
      await fetch(`${apiUrl}/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      setRecentOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
      );
    } catch { /* silent */ }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={loading ? '—' : stats.totalProducts} icon="products" />
        <StatCard title="Total Orders" value={loading ? '—' : stats.totalOrders} icon="orders" />
        <StatCard title="Pending Orders" value={loading ? '—' : stats.pendingOrders} icon="pending" />
        <StatCard title="Today's Orders" value={loading ? '—' : stats.todayOrders} icon="today" />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/daksh-manage-2024/products/new" className="px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:brightness-110 transition-all">
          + Add New Product
        </Link>
        <Link href="/daksh-manage-2024/orders" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all">
          View All Orders
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <OrderTable orders={recentOrders} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
