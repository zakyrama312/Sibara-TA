import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement, // INI WAJIB BUAT LINE CHART
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' as const },
        title: { display: true, text: 'Statistik Peminjaman Barang per Bulan' },
    },
};

const data = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
        {
            label: 'Peminjaman',
            data: [12, 19, 8, 15, 10, 5],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.4, // buat garisnya agak melengkung
            fill: true, // biar ada warna transparan di bawah garis
            pointBackgroundColor: '#3b82f6',
        },
    ],
};

export default function PeminjamanChart() {
    return <Line options={options} data={data} />;
}
