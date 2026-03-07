import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function RelevanceChart({ data }) {
  const map = {};
  data.forEach((d) => {
    if (d.city && d.relevance) {
      map[d.city] = (map[d.city] || 0) + d.relevance;
    }
  });

  // Get Top 6 Cities for a clean Radar chart
  const sortedEntries = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const chartData = {
    labels: sortedEntries.map(([city]) => city),
    datasets: [{
      label: "Relevance Score",
      data: sortedEntries.map(([, val]) => val),
      backgroundColor: "rgba(16, 185, 129, 0.2)", // Emerald transparent
      borderColor: "#10b981", // Emerald solid
      pointBackgroundColor: "#10b981",
      pointBorderColor: "#fff",
      borderWidth: 2,
    }],
  };

  const options = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="h-[320px] w-full p-2">
      <Radar data={chartData} options={options} />
    </div>
  );
}
export default RelevanceChart;