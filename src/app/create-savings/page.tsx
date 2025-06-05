'use client'
import { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreateSaving() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("Per-Minggu");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "savings"), {
        name,
        target,
        collected: 0,
        startDate,
        endDate,
        frequency,
        transactions: [],
      });
      alert("Saving created successfully!");
      router.push('/savings');
    } catch (error) {
      console.error("Error creating saving:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tabungan Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block font-semibold">Nama Tabungan:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-lime-500 w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Nominal (Rp):</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="border-b-2 border-lime-500 w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Periode Waktu:</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-b-2 border-lime-500 p-2 w-1/2"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-b-2 border-lime-500 p-2 w-1/2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Frekuensi Menabung:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="border-b-2 border-lime-500 w-full p-2"
          >
            <option value="Per-Hari">Per-Hari</option>
            <option value="Per-Minggu">Per-Minggu</option>
            <option value="Per-Bulan">Per-Bulan</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600"
        >
          Buat Tabungan
        </button>
      </form>
    </div>
  );
}
