'use client';
import { HiOutlineBell } from 'react-icons/hi2';

export default function NotificationPage() {
  const notifications = [
    {
      date: '27 Mei 2025',
      day: 'Hari Ini',
      items: [
        {
          type: 'reminder',
          message: 'Hi! Kamu belum melakukan tabungan bulan ini? Segera lakukan pencatatan untuk mencapai tujuanmu!',
        },
        {
          type: 'announcement',
          message: 'Kamu telah menyelesaikan tabunganmu! Selamat menikmati hasil jerih payahmu!',
        },
      ],
    },
    {
      date: '26 Mei 2025',
      day: 'Kemarin',
      items: [
        {
          type: 'reminder',
          message: 'Hi! Kamu belum melakukan tabungan bulan ini? Segera lakukan pencatatan untuk mencapai tujuanmu!',
        },
        {
          type: 'reminder',
          message: 'Hi! Kamu belum melakukan tabungan bulan ini? Segera lakukan pencatatan untuk mencapai tujuanmu!',
        },
        {
          type: 'reminder',
          message: 'Hi! Kamu belum melakukan tabungan bulan ini? Segera lakukan pencatatan untuk mencapai tujuanmu!',
        },
      ],
    },
  ];

  const typeStyle = {
    reminder: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    announcement: 'bg-green-100 text-green-800 border-green-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tabungan Aktif</h1>
        <HiOutlineBell size={24} className="text-gray-600" />
      </div>

      {notifications.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            {section.day} – {section.date}
          </h2>

          <div className="space-y-3">
            {section.items.map((notif, i) => (
              <div
                key={i}
                className={`border-l-4} p-4 rounded-lg shadow-sm flex items-start gap-3 bg-white`}
              >
                <span className="mt-1 w-3 h-3 rounded-full bg-current" />
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded bg-opacity-20 ${
                      notif.type === 'reminder'
                        ? 'bg-yellow-300 text-yellow-700'
                        : 'bg-green-300 text-green-700'
                    }`}
                  >
                    {notif.type === 'reminder' ? 'Reminder' : 'Announcement'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
