'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      router.push('/dashboard'); 
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 text-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <div className="mb-4 flex justify-center">
          <img src="/assets/logo-savery.png" alt="Logo" className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-green-400 mb-1">Savery</h1>
        <p className="text-lg font-medium mb-6">Login</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 rounded-md bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-2 text-sm text-neutral-400 hover:text-white"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition"
        >
          Masuk
        </button>

        <p className="mt-4 text-sm text-neutral-400">
          Belum punya akun?{' '}
          <Link href="/register" className="text-green-400 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
