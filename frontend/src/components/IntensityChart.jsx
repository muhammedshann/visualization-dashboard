import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register more modules for better interactivity
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function IntensityChart({ data }) {
  // Aggregate data
  const map = {};
  data.forEach((d) => {
    if (d.country) {
      map[d.country] = (map[d.country] || 0) + (d.intensity || 0);
    }
  });

  // Sort and take top 10 to keep the chart clean
  const sortedLabels = Object.keys(map)
    .sort((a, b) => map[b] - map[a])
    .slice(0, 10);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Intensity Score",
        data: sortedLabels.map((key) => map[key]),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          
          // Create a beautiful vertical gradient
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#3b82f6"); // Blue 500
          gradient.addColorStop(1, "#60a5fa"); // Blue 400
          return gradient;
        },
        borderRadius: 8,
        hoverBackgroundColor: "#2563eb", // Darker blue on hover
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We don't need the legend for a single dataset
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Clean look: No vertical lines
        ticks: {
          color: "#64748b",
          font: { family: "'Inter', sans-serif", size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9", // Very light horizontal lines
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default IntensityChart;