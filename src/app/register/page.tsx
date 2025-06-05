'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      // Redirect or do something
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
        <p className="text-lg font-medium mb-6">Register</p>

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
            className="absolute right-3 top-2 text-sm text-neutral-400 hover:text-white"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition"
        >
          Daftar
        </button>

        <p className="mt-4 text-sm text-neutral-400">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-green-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
