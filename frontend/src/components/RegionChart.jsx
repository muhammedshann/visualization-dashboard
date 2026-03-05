import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Doughnut-specific elements
ChartJS.register(ArcElement, Tooltip, Legend);

function RegionChart({ data }) {
  // Aggregate counts for regions
  const counts = {};
  data.forEach((d) => {
    if (d.region) {
      counts[d.region] = (counts[d.region] || 0) + 1;
    }
  });

  // Sort and take top 6 regions + "Others" to keep the circle clean
  const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const topRegions = sortedEntries.slice(0, 5);
  const otherCount = sortedEntries.slice(5).reduce((acc, curr) => acc + curr[1], 0);

  const labels = topRegions.map(([name]) => name);
  const values = topRegions.map(([, count]) => count);
  
  if (otherCount > 0) {
    labels.push("Others");
    values.push(otherCount);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#6366f1", // Indigo
          "#8b5cf6", // Violet
          "#ec4899", // Pink
          "#f59e0b", // Amber
          "#10b981", // Emerald
          "#94a3b8", // Slate (for others)
        ],
        hoverBackgroundColor: [
          "#4f46e5",
          "#7c3aed",
          "#db2777",
          "#d97706",
          "#059669",
          "#64748b",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 15, // Interactive "pop out" effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // This makes the "ring" thinner and more modern
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ${context.label}: ${context.formattedValue} Insights`,
        },
      },
    },
  };

  return (
    <div className="relative h-[320px] w-full flex flex-col items-center">
      <Doughnut data={chartData} options={options} />
      {/* Central Label - Optional Visual Touch */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-2xl font-bold text-slate-700">{data.length}</span>
        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-tighter">Total</p>
      </div>
    </div>
  );
}

export default RegionChart;