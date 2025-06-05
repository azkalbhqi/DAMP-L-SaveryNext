'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-lime-50 to-white min-h-screen text-gray-800">
      {/* Hero */}
      <section className="px-6 py-20 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Mulai Menabung Lebih Mudah dengan <span className="text-lime-600">Savery</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Kelola, pantau, dan capai tujuan finansialmu dengan cara yang menyenangkan dan terstruktur.
        </p>
        <Link href="/register">
          <Button className="bg-lime-500 text-white hover:bg-lime-600 px-6 py-2 text-lg">
            Daftar Sekarang
          </Button>
        </Link>
      </section>

      {/* Fitur */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Kenapa Pakai Savery?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-2">Pantau Progres</h3>
              <p className="text-gray-600">Lihat seberapa dekat kamu dengan target tabunganmu setiap saat.</p>
            </div>
            <div className="p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-2">Pengingat Cerdas</h3>
              <p className="text-gray-600">Jangan sampai lupa menabung dengan notifikasi pintar tiap periode.</p>
            </div>
            <div className="p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-2">Riwayat Transaksi</h3>
              <p className="text-gray-600">Catat dan lacak semua transaksi secara otomatis & rapi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-16 px-6 bg-lime-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Apa Kata Mereka?</h2>
          <div className="space-y-6">
            <blockquote className="italic text-gray-700">
              “Savery bikin menabung jadi seru dan terarah. Saya berhasil nabung buat liburan dalam 3 bulan!”
              <br />
              <span className="block mt-2 font-bold text-lime-600">— Rani, Mahasiswi</span>
            </blockquote>
            <blockquote className="italic text-gray-700">
              “Fitur reminder-nya bener-bener bantu banget. Sekarang nabung tiap minggu jadi rutin.”
              <br />
              <span className="block mt-2 font-bold text-lime-600">— Aldi, Karyawan</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Capai Tujuan Keuanganmu?</h2>
        <p className="mb-6 text-gray-600">Mulai sekarang bersama Savery, tabunganmu lebih aman dan terarah.</p>
        <Link href="/register">
          <Button className="bg-lime-500 text-white px-8 py-3 text-lg hover:bg-lime-600">
            Coba Gratis Sekarang
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Savery. All rights reserved.
      </footer>
    </main>
  );
}
