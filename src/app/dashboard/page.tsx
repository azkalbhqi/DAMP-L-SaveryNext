// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface Saving {
  id: string;
  name: string;
  target: number;
  collected: number;
  startDate: string;
}

const chartConfig = {
  desktop: {
    label: 'Total Collected',
    color: 'var(--chart-1)',
  },
};

export default function Dashboard() {
  const [savings, setSavings] = useState<Saving[]>([]);

  useEffect(() => {
    const fetchSavings = async () => {
      const snapshot = await getDocs(collection(db, 'savings'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Saving[];

      setSavings(data);
    };

    fetchSavings();
  }, []);

  // Format data untuk chart: berdasarkan bulan, jumlah collected
  const chartData = savings.map((saving) => ({
    month: new Date(saving.startDate).toLocaleString('default', { month: 'long' }),
    desktop: saving.collected,
  }));
  const [totalCollected, setTotalCollected] = useState(0);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'savings'));
        const data = snapshot.docs.map(doc => doc.data() as Saving);
        const total = data.reduce((sum, saving) => sum + (saving.collected || 0), 0);
        setTotalCollected(total);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Tabungan</h1>

      <div className="p-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <p className="text-lg font-medium mb-2">Total Uang Terkumpul</p>
        <h2 className="text-3xl font-bold text-green-600">
          Rp{totalCollected.toLocaleString('id-ID')}
        </h2>
      </div>
    </div>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performa Tabungan</CardTitle>
          <CardDescription>Total tabungan dari berbagai goal</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending naik bulan ini <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Menampilkan total yang terkumpul per bulan
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
