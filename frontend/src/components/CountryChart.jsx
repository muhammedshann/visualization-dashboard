import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function CountryChart({ data }) {
  const map = {};
  data.forEach((d) => {
    if (d.country) {
      map[d.country] = (map[d.country] || 0) + 1;
    }
  });

  // Top 5 Countries
  const sortedEntries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const chartData = {
    labels: sortedEntries.map(([country]) => country),
    datasets: [
      {
        label: "Insights",
        data: sortedEntries.map(([, count]) => count),
        backgroundColor: "#8b5cf6", // Violet
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Makes it horizontal!
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1e293b", padding: 12, cornerRadius: 8 },
    },
    scales: {
      x: { display: false }, // Hide bottom axis for a super clean look
      y: {
        grid: { display: false },
        ticks: { color: "#475569", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="h-[280px] w-full p-2">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default CountryChart;