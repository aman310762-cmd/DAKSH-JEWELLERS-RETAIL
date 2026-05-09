'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) localStorage.setItem('adminToken', data.token);
        router.push('/daksh-manage-2024');
      } else {
        setError(data.error || 'Incorrect email or password');
      }
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#C9A84C] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#080808] font-bold text-xl">DJ</span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-wider">DAKSH JEWELLERS</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleLogin} className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dakshjewellers.com"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-[#C9A84C] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-[#C9A84C] focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-800/30 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C9A84C] text-[#080808] text-sm font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
