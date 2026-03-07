import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function RelevanceChart({ data }) {
  // Aggregate relevance scores by sector
  const map = {};
  data.forEach((d) => {
    if (d.sector && d.relevance) {
      map[d.sector] = (map[d.sector] || 0) + d.relevance;
    }
  });

  // Take the Top 6 sectors to keep the radar shape clean
  const sortedEntries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const chartData = {
    labels: sortedEntries.map(([sector]) => sector),
    datasets: [
      {
        label: "Total Relevance",
        data: sortedEntries.map(([, val]) => val),
        backgroundColor: "rgba(16, 185, 129, 0.2)", // Emerald transparent
        borderColor: "#10b981", // Emerald solid
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10b981",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend to save space
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      r: {
        ticks: { display: false }, // Hides the numbers on the spider web
        grid: { color: "#f1f5f9" },
        pointLabels: {
          font: { size: 11, family: "'Inter', sans-serif" },
          color: "#64748b",
        },
      },
    },
  };

  if (sortedEntries.length === 0) {
    return <div className="h-[250px] flex items-center justify-center text-slate-400">No relevance data</div>;
  }

  return (
    <div className="h-[280px] w-full p-2">
      <Radar data={chartData} options={options} />
    </div>
  );
}

export default RelevanceChart;