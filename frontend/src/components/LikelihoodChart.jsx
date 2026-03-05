import { useMemo } from "react";
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

// Register necessary ChartJS modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LikelihoodChart({ data }) {
  // Memoize data aggregation to improve performance on large datasets
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return { labels: [], datasets: [] };

    const map = {};
    data.forEach((d) => {
      // Aggregate likelihood by region, handling potential nulls/undefined
      const region = d.region || "Unknown";
      map[region] = (map[region] || 0) + (d.likelihood || 0);
    });

    // Sort regions by likelihood value (descending)
    const sortedEntries = Object.entries(map).sort((a, b) => b[1] - a[1]);

    const labels = sortedEntries.map(([region]) => region);
    const likelihoodValues = sortedEntries.map(([, value]) => value);

    return {
      labels,
      datasets: [
        {
          label: "Aggregate Likelihood",
          data: likelihoodValues,
          // Custom Horizontal Gradient: Warm Teal to Yellow
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;

            // Create a horizontal gradient (from left to right)
            const gradient = ctx.createLinearGradient(
              chartArea.left,
              0,
              chartArea.right,
              0
            );
            gradient.addColorStop(0, "#2dd4bf"); // Teal 400
            gradient.addColorStop(0.5, "#4ade80"); // Green 400
            gradient.addColorStop(1, "#a3e635"); // Lime 400
            return gradient;
          },
          borderRadius: 6,
          // Stronger color on hover for feedback
          hoverBackgroundColor: "#14b8a6", // Teal 600
          borderSkipped: false,
          barPercentage: 0.8, // Slightly thinner bars for cleaner spacing
        },
      ],
    };
  }, [data]);

  const options = {
    indexAxis: "y", // *** Converts the chart to HORIZONTAL ***
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Single dataset, legend isn't needed
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold", family: "'Inter', sans-serif" },
        bodyFont: { size: 13, family: "'Inter', sans-serif" },
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => ` Likelihood Score: ${context.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9", // Soft vertical grid lines
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
        },
      },
      y: {
        grid: { display: false }, // Clean look: No horizontal lines across bars
        ticks: {
          color: "#475569", // Darker label color for readability
          font: { weight: "600", size: 12, family: "'Inter', sans-serif" },
          padding: 10,
        },
      },
    },
    animation: {
      duration: 750, // Smooth ease-out animation on load
      easing: "easeOutQuart",
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-400">
        No likelihood data available
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full p-2">
      <Bar data={processedData} options={options} />
    </div>
  );
}

export default LikelihoodChart;