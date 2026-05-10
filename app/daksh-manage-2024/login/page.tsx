'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'otp'>('password');

  // Password login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // OTP login state
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* ── Hardcoded admin credentials (client-side fallback) ── */
  const ADMIN_CREDENTIALS = [
    { username: 'Parveen@123', password: 'Focused123' },
    { username: 'dakshretailadmin', password: 'DJRetail@#123' },
  ];
  const ADMIN_PHONE = '9896424648';
  const VALID_OTP = '2024'; // Fixed OTP for simplicity

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // First try backend API (bcrypt-verified, production-safe)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token) localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminLoggedIn', 'true');
        setLoading(false);
        router.push('/daksh-manage-2024');
        return;
      }
    } catch {
      // Backend unavailable — try client-side fallback
    }

    // Client-side fallback (works without backend/DB)
    const match = ADMIN_CREDENTIALS.find(
      (c) => c.username === username && c.password === password
    );
    if (match) {
      localStorage.setItem('adminToken', 'admin-authenticated');
      localStorage.setItem('adminLoggedIn', 'true');
      setLoading(false);
      router.push('/daksh-manage-2024');
      return;
    }

    setError('Incorrect username or password');
    setLoading(false);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phone === ADMIN_PHONE) {
      setOtpSent(true);
    } else {
      setError('Phone number not registered');
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (otp === VALID_OTP) {
      localStorage.setItem('adminToken', 'admin-authenticated');
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/daksh-manage-2024');
    } else {
      setError('Invalid OTP. Try: 2024');
    }
    setLoading(false);
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

        {/* Mode Tabs */}
        <div className="flex mb-4 bg-[#111] border border-[#222] rounded-lg overflow-hidden">
          <button
            onClick={() => { setMode('password'); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-medium transition-all ${
              mode === 'password' ? 'bg-[#C9A84C] text-[#080808]' : 'text-gray-500 hover:text-white'
            }`}
          >
            🔐 Password
          </button>
          <button
            onClick={() => { setMode('otp'); setError(''); setOtpSent(false); }}
            className={`flex-1 py-2.5 text-sm font-medium transition-all ${
              mode === 'otp' ? 'bg-[#C9A84C] text-[#080808]' : 'text-gray-500 hover:text-white'
            }`}
          >
            📱 Phone OTP
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
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
          ) : (
            /* OTP Mode */
            !otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Phone Number</label>
                  <div className="flex">
                    <span className="px-3 py-3 bg-[#0a0a0a] border border-r-0 border-[#222] rounded-l-lg text-sm text-gray-500">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter registered phone"
                      required
                      maxLength={10}
                      className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-r-lg text-sm text-white placeholder:text-gray-600 focus:border-[#C9A84C] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-800/30 rounded-lg p-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9A84C] text-[#080808] text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <p className="text-sm text-gray-400 text-center mb-2">
                  OTP sent to +91 {phone.slice(0, 4)}****{phone.slice(8)}
                </p>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="4-digit OTP"
                    required
                    maxLength={4}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-sm text-white text-center text-2xl tracking-[0.5em] placeholder:text-gray-600 placeholder:text-sm placeholder:tracking-normal focus:border-[#C9A84C] focus:outline-none transition-colors"
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
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(''); setError(''); }}
                  className="w-full py-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                  ← Change phone number
                </button>
              </form>
            )
          )}
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Forgot credentials? Contact the developer.
        </p>
      </div>
    </div>
  );
}
