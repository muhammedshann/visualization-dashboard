import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CityChart({ data }) {
  const map = {};
  data.forEach((d) => {
    if (d.city) {
      map[d.city] = (map[d.city] || 0) + 1;
    }
  });

  // Top 4 Cities
  const sortedEntries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const chartData = {
    labels: sortedEntries.map(([city]) => city),
    datasets: [
      {
        data: sortedEntries.map(([, count]) => count),
        backgroundColor: ["#3b82f6", "#f43f5e", "#f59e0b", "#10b981"], // Blue, Rose, Amber, Emerald
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%", // Thin, modern ring
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, padding: 15, font: { size: 11 } },
      },
      tooltip: { backgroundColor: "#1e293b", padding: 12, cornerRadius: 8 },
    },
  };

  if (sortedEntries.length === 0) {
    return <div className="h-[250px] flex items-center justify-center text-slate-400">No city data</div>;
  }

  return (
    <div className="h-[280px] w-full p-2">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default CityChart;