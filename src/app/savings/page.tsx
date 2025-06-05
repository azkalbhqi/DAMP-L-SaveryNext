'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';

interface Saving {
  id: string;
  name: string;
  target: number;
  collected: number;
}

export default function SavingsDashboard() {
  const [savings, setSavings] = useState<Saving[]>([]);

  useEffect(() => {
    const fetchSavings = async () => {
      const snapshot = await getDocs(collection(db, 'savings'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Saving[];
      setSavings(data);
    };

    fetchSavings();
  }, []);

  return (
    <div className="flex flex-col p-6">
      <div className="px-4 flex items-center justify-between mb-7">
                <h1 className="text-2xl font-bold">Tabungan Aktif</h1>
            
              </div>
   
      {/* Savings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savings.map((item) => {
          const progress = item.target > 0 ? Math.round((item.collected / item.target) * 100) : 0;

          return (
            <Link href={`/savings/${item.id}`} key={item.id}>
              <div className="bg-neutral-900 text-white rounded-lg p-4 shadow-md hover:bg-neutral-800 transition cursor-pointer relative">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <Image src="/assets/wallet.png" alt="icon" width={24} height={24} />
                  </div>
                  <span className="text-sm text-gray-300 absolute top-4 right-4">⋮</span>
                </div>
                <p className="mt-4 text-sm text-gray-300">{item.name}</p>
                <p className="text-lg font-bold">{progress}% – <span className="text-green-400">Progress</span></p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Add New Button */}
      <div className="fixed bottom-6 right-6">
        <Link
          href="/create-savings"
          className="bg-neutral-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-neutral-800"
        >
          <FaPlus /> Tabungan Baru
        </Link>
      </div>
    </div>
  );
}
