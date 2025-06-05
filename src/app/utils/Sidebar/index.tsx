'use client';

import { useEffect, useState } from 'react';
import { FaBars, FaCog, FaHistory, FaThLarge } from 'react-icons/fa';
import { HiOutlineSearch, HiOutlineBell, HiOutlineDotsHorizontal } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/firebase/firebaseConfig';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email || '');
        setUserName(user.displayName || 'User');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`flex flex-col h-screen bg-neutral-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo-savery.png" alt="Logo" width={32} height={32} />
          {isOpen && <span className="text-xl font-bold text-green-400">Savery</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <FaBars />
        </button>
      </div>

      {/* Section Header */}
      {isOpen && (
        <div className="px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
          <Link
            href="/notification"
            className="transition-transform hover:scale-120 hover:animate-shake inline-block"
          >
            <HiOutlineBell size={24} />
          </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 mt-2 space-y-4 px-4">
        <Link href="/dashboard" className="flex items-center gap-4 hover:text-green-400">
          <FaThLarge size={20} />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link href="/savings" className="flex items-center gap-4 hover:text-green-400">
          <FaHistory size={20} />
          {isOpen && <span>Riwayat</span>}
        </Link>

        <Link href="/settings" className="flex items-center gap-4 hover:text-green-400">
          <FaCog size={20} />
          {isOpen && <span>Pengaturan</span>}
        </Link>
      </nav>

      {/* Footer User Info */}
      <div className="px-4 py-5 border-t border-neutral-700 mt-auto flex items-center gap-3">
        <Image
          src="/assets/logo-savery.png"
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        {isOpen && (
          <div className="text-sm">
            <p className="font-semibold">{userName}</p>
            <p className="text-neutral-400 text-xs">{userEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
}
