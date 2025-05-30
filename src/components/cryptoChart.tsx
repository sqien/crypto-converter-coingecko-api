import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  coinId: string;
  currency: string;
}

export function CryptoChart({ coinId, currency }: Props) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=7`
    )
      .then((res) => res.json())
      .then((data) => {
        const labels = data.prices.map((p: number[]) => {
          const date = new Date(p[0]);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });

        const prices = data.prices.map((p: number[]) => p[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId} price`,
              data: prices,
              borderColor: 'rgba(235, 235, 235, 1)',
              backgroundColor: 'rgba(154, 154, 154, 1)',
              tension: 0.1,
              fill: false,
            },
          ],
        });
      });
  }, [coinId, currency]);

  return (
    <div className="mt-6">
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>
          Loading chart..{' '}
          <small>
            If it doesn't work, it's because the API calls have run out of limit
            | or CORS shut down the server
          </small>
        </p>
      )}
    </div>
  );
}
