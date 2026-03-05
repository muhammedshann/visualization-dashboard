import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Polar-specific elements
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function TopicChart({ data }) {
  // Aggregate topic counts
  const counts = {};
  data.forEach((d) => {
    // Handling "topic" or "topics" depending on your API field name
    const topic = d.topic || d.topics; 
    if (topic) {
      counts[topic] = (counts[topic] || 0) + 1;
    }
  });

  // Sort and take Top 8 to prevent the "confetti" look of too many slices
  const sortedTopics = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const labels = sortedTopics.map(([name]) => name);
  const values = sortedTopics.map(([, count]) => count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Top Topics",
        data: values,
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",  // Indigo
          "rgba(236, 72, 153, 0.7)",  // Pink
          "rgba(245, 158, 11, 0.7)",  // Amber
          "rgba(16, 185, 129, 0.7)",  // Emerald
          "rgba(59, 130, 246, 0.7)",  // Blue
          "rgba(139, 92, 246, 0.7)",  // Violet
          "rgba(244, 63, 94, 0.7)",   // Rose
          "rgba(100, 116, 139, 0.7)", // Slate
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: { display: false }, // Hide the numbers on the rings for a cleaner look
        grid: { color: "#f1f5f9" },
        angleLines: { color: "#f1f5f9" },
      },
    },
    plugins: {
      legend: {
        position: "right", // Moving legend to the right saves vertical space
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 15,
          font: { size: 11, family: "'Inter', sans-serif" },
          color: "#64748b",
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        cornerRadius: 8,
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: {
          label: (context) => ` ${context.label}: ${context.formattedValue} Mentions`,
        },
      },
    },
  };

  if (labels.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-400 italic">
        No topic data available
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full p-2">
      <PolarArea data={chartData} options={options} />
    </div>
  );
}

export default TopicChart;