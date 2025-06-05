'use client'

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import {
    RadialBarChart,
    RadialBar,
    PolarRadiusAxis,
} from 'recharts';
import Link from 'next/link';

interface Saving {
    name: string;
    target: number;
    collected: number;
    frequency: string;
    startDate: string;
    endDate: string;
    transactions: {
        date: string;
        amount: number;
        status: string;
    }[];
}

export default function SavingDetail() {
    const { id } = useParams();
    const [saving, setSaving] = useState<Saving | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSaving = async () => {
            setIsLoading(true);
            setError(null);

            if (!id) {
                setError("Saving ID is not available.");
                setIsLoading(false);
                return;
            }

            try {
                const docRef = doc(db, 'savings', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setSaving(docSnap.data() as Saving);
                } else {
                    setError("No such saving document exists!");
                    setSaving(null);
                }
            } catch (err) {
                console.error("Error fetching saving:", err);
                setError("Failed to load saving details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSaving();
    }, [id]);

    if (isLoading) {
        return <div className="p-6 text-center text-gray-600">Loading saving details...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    if (!saving) {
        return <div className="p-6 text-center text-gray-600">No saving data found.</div>;
    }

    const percentage = Math.round((saving.collected / saving.target) * 100);

    const radialData = [
        { name: 'Collected', value: percentage, fill: '#10b981' },
        { name: 'Remaining', value: 100 - percentage, fill: '#e5e7eb' },
    ];

    let durationDays = 0;
    let durationWeeks = 0;
    try {
        const startDate = new Date(saving.startDate);
        const endDate = new Date(saving.endDate);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            durationDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            durationWeeks = Math.ceil(durationDays / 7);
        } else {
            console.warn("Invalid date format in saving data.");
        }
    } catch (e) {
        console.error("Error calculating duration:", e);
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString;
            }
            return new Intl.DateTimeFormat('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        } catch (e) {
            console.error("Error formatting date:", e);
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-inter">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">{saving.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Progress and Target Section */}
                <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-xl flex flex-col lg:flex-row items-center justify-between transition-all duration-300 hover:shadow-xl relative">
                    <div className="w-full lg:w-1/2 flex flex-col items-center relative">
                        <p className="text-sm text-gray-500 mb-2">Progress Tabungan</p>
                        <div className="relative w-[250px] h-[160px]">
                            <RadialBarChart
                                width={250}
                                height={160}
                                cx="50%"
                                cy="100%"
                                innerRadius={70}
                                outerRadius={100}
                                barSize={20}
                                data={radialData}
                                startAngle={180}
                                endAngle={0}
                            >
                                <PolarRadiusAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                                <RadialBar
                                    background={{ fill: radialData[1].fill }}
                                    dataKey="value"
                                    cornerRadius={10}
                                    fill={radialData[0].fill}
                                />
                            </RadialBarChart>
                            <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <p className="text-3xl font-bold text-gray-800">{percentage}%</p>
                                <p className="text-sm text-gray-500">Progress</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-8 text-center lg:text-left">
                        <p className="text-sm text-gray-500 mb-2">Target Tabungan</p>
                        <div className="flex flex-col justify-center lg:justify-between items-center sm:items-baseline font-bold text-xl mb-4">
                            <span className="text-gray-800">{formatCurrency(saving.target)}</span>
                            <span className="text-red-500 mt-2 sm:mt-0 sm:ml-4">Sisa: {formatCurrency(saving.target - saving.collected)}</span>
                        </div>
                        <p className="mt-4 text-gray-700 text-lg">Terkumpul: <span className="font-semibold">{formatCurrency(saving.collected)}</span></p>
                        {/* <h1 className='text-4xl font-bold text-green-900'>{percentage}%</h1> */}
                    </div>
                </div>

                {/* Details and Add Transaction Section */}
                <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                    <div>
                        <p className="text-gray-700 mb-2"><strong>Nominal:</strong> {formatCurrency(saving.target)}</p>
                        <p className="text-gray-700 mb-2"><strong>Frekuensi:</strong> {saving.frequency}</p>
                        <p className="text-gray-700 mb-4"><strong>Durasi:</strong> {durationDays} Hari (~ {durationWeeks} Minggu)</p>
                    </div>
                    <Link href={`/savings/${id}/add-transaction`} className="w-full">
                        <button className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
                            <FaPlus className="w-5 h-5" /> Tambah Transaksi
                        </button>
                    </Link>
                </div>
            </div>

            {/* Transaction History Section */}
            <div className="mt-10 max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Riwayat Transaksi</h2>
                {saving.transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada transaksi untuk tabungan ini.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {saving.transactions
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((tx, index) => (
                                <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3">
                                    <span className="font-medium text-gray-700 mb-1 sm:mb-0">{formatDate(tx.date)}</span>
                                    <span className="text-gray-800 font-semibold">{formatCurrency(tx.amount)}</span>
                                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                        tx.status === 'done' ? 'bg-green-100 text-green-700' :
                                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
