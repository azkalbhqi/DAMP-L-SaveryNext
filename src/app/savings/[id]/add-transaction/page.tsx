'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/firebase/firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment
} from 'firebase/firestore';

export default function AddTransactionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [savingName, setSavingName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchSaving = async () => {
      const docRef = doc(db, 'savings', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavingName(data.name || '');
      }
    };
    if (id) fetchSaving();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount) return alert('Isi semua kolom');

    const docRef = doc(db, 'savings', id as string);

    await updateDoc(docRef, {
      transactions: arrayUnion({
        date,
        amount: Number(amount),
        status: 'done',
      }),
      collected: increment(Number(amount)),
    });

    router.push(`/savings/${id}`);
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Transaksi</h1>
        <p className="text-center mb-6 text-gray-600">{savingName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nominal</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Rp"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Tambah Transaksi
          </button>
        </form>
      </div>
    </div>
  );
}
