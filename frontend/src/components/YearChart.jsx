import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, // Required for the area fill gradient
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function YearChart({ data }) {
  const processedData = useMemo(() => {
    const map = {};
    data.forEach((d) => {
      // Use end_year or start_year depending on your data structure
      const year = d.end_year || d.start_year || d.year;
      if (year && !isNaN(year)) {
        map[year] = (map[year] || 0) + (d.intensity || 0);
      }
    });

    // Sort years chronologically
    const sortedYears = Object.keys(map).sort((a, b) => Number(a) - Number(b));

    return {
      labels: sortedYears,
      datasets: [
        {
          fill: true, // Enables the area fill
          label: "Intensity Trend",
          data: sortedYears.map((y) => map[y]),
          borderColor: "#3b82f6", // Primary Blue
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)"); // Blue with opacity
            gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)"); // Fades to transparent
            return gradient;
          },
          tension: 0.4, // *** This makes the line smooth/curvy ***
          pointRadius: 0, // Hides points by default
          pointHoverRadius: 6, // Shows point on hover
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          borderWidth: 3,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index", // Shows tooltip for the nearest x-axis value
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9", drawBorder: false },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
          callback: (value) => value.toLocaleString(), // Adds commas to large numbers
        },
      },
    },
  };

  return (
    <div className="h-[350px] w-full p-2">
      <Line data={processedData} options={options} />
    </div>
  );
}

export default YearChart;