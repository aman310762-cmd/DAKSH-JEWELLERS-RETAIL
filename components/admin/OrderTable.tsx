'use client';

import { useState } from 'react';

interface OrderItem {
  name: string;
  weight: string;
  purity: string;
  qty: number;
}

interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
  items: OrderItem[];
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: string) => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  dispatched: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

export default function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <p className="text-gray-500 font-medium">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Order ID</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Phone</th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Items</th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((o) => (
              <>
                <tr
                  key={o.orderId}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === o.orderId ? null : o.orderId)}
                >
                  <td className="px-4 py-3 text-sm font-mono text-[#C9A84C] font-medium">{o.orderId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{o.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{o.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-center">{o.items.length}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[o.status] || 'bg-gray-100 text-gray-500'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400 text-right">
                    {new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>
                </tr>
                {/* Expanded row */}
                {expanded === o.orderId && (
                  <tr key={`${o.orderId}-detail`}>
                    <td colSpan={6} className="bg-gray-50 px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-900">{o.address}, {o.city} {o.pincode}</p>
                          {o.landmark && <p className="text-sm text-gray-500">Landmark: {o.landmark}</p>}
                          <p className="text-xs text-gray-500 mt-2">Payment: {o.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Items</p>
                          {o.items.map((item, i) => (
                            <p key={i} className="text-sm text-gray-700">{item.name} ({item.weight}g, {item.purity}) ×{item.qty}</p>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                        <select
                          value={o.status}
                          onChange={(e) => onStatusChange(o.orderId, e.target.value)}
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded bg-white focus:border-[#C9A84C] focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <a href={`tel:${o.phone}`} className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                          📞 Call
                        </a>
                        <a
                          href={`https://wa.me/91${o.phone}?text=${encodeURIComponent(`Hi ${o.customerName}, your Daksh Jewellers order ${o.orderId} has been ${o.status}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
