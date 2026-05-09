'use client';

import { useEffect, useState } from 'react';
import OrderTable from '@/components/admin/OrderTable';

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

const statusFilters = ['all', 'pending', 'confirmed', 'dispatched', 'delivered'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('adminToken') || '';
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`${apiUrl}/api/admin/orders?${params}`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch { /* Demo */ }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [statusFilter, search]);

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
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
      );
    } catch { /* silent */ }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID or customer name..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:outline-none"
        />
        <div className="flex gap-2">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                statusFilter === s
                  ? 'bg-[#C9A84C] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <OrderTable orders={orders} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
