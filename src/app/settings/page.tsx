'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { updateEmail, updatePassword, signOut } from 'firebase/auth';

export default function Pengaturan() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email || '');
      setNewEmail(user.email || '');
    }
  }, []);

  const handleEmailChange = async () => {
    const user = auth.currentUser;
    if (user && newEmail !== user.email) {
      try {
        await updateEmail(user, newEmail);
        setStatus('Email berhasil diperbarui.');
        setUserEmail(newEmail);
      } catch (error: any) {
        setStatus('Gagal memperbarui email: ' + error.message);
      }
    }
  };

  const handlePasswordChange = async () => {
    const user = auth.currentUser;
    if (user && newPassword.length >= 6) {
      try {
        await updatePassword(user, newPassword);
        setStatus('Password berhasil diperbarui.');
        setNewPassword('');
      } catch (error: any) {
        setStatus('Gagal memperbarui password: ' + error.message);
      }
    } else {
      setStatus('Password harus minimal 6 karakter.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-black p-8">
      <h1 className="text-xl font-bold mb-6">Pengaturan</h1>

      {status && <p className="mb-4 text-sm text-red-500">{status}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Akun */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-lg">Akun</h2>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
            />
            <button
              onClick={handleEmailChange}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Simpan Email
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
              placeholder="********"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Simpan Password
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
          >
            Logout
          </button>
        </div>

        {/* Kartu Visual */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-lg">Visual</h2>

          <div className="flex items-center justify-between">
            <span>Dark mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="h-5 w-5 text-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bahasa</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
