// "use client";
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   Filler,
// } from "chart.js";
// import Link from "next/link";

// // Register Chart.js components
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   Filler
// );

// const SalesAnalytics = () => {
//   const [timeFrame, setTimeFrame] = useState("Weekly");
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch data from the backend
//   const fetchData = async (period) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://y-balash.vercel.app/api/seller/sales-analytics?period=${period.toLowerCase()}`
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${period} data`);
//       }

//       const data = await response.json();

//       // Transform the API data to Chart.js format
//       const transformedData = {
//         labels:
//           data.labels ||
//           (period === "Weekly"
//             ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
//             : ["Week 1", "Week 2", "Week 3", "Week 4"]),
//         datasets: [
//           {
//             label: "Sales",
//             data: data.sales || [], // Assuming the API returns an array of sales values
//             borderColor: "#049601",
//             backgroundColor: "rgba(76, 175, 80, 0.1)",
//             fill: true,
//             tension: 0,
//             pointRadius: 0,
//           },
//         ],
//       };

//       setChartData(transformedData);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Fetch data when timeFrame changes
//   useEffect(() => {
//     fetchData(timeFrame);
//   }, [timeFrame]);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: false,
//       },
//     },
//     scales: {
//       x: {
//         display: false,
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         display: false,
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   return (
//     <Link href="/sales-analytics">
//       <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 container lg:mt-12 mt-6 lg:mb-12 mb-6 w-full">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-medium text-gray-900 mb-6">Sales Analytics</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setTimeFrame("Weekly")}
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 timeFrame === "Weekly"
//                   ? "bg-Main text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Weekly
//             </button>
//             <button
//               onClick={() => setTimeFrame("Monthly")}
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 timeFrame === "Monthly"
//                   ? "bg-Main text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="h-44 w-full">
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : chartData ? (
//             <div className="h-full">
//               <Line data={chartData} options={options} />
//             </div>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default SalesAnalytics;



"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from "chart.js";
import Link from "next/link";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0ODEyMzYxOCwiZXhwIjoxNzUwNzE1NjE4fQ.lZ1_nBuc-rxi3lPAx55iDr9kq-3Pj8m0BlJctjuMmlo";

const SalesAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("Weekly");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (period) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://y-balash.vercel.app/api/seller/sales-analytics?period=${period.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${period} data`);
      }

      const data = await response.json();

      const transformedData = {
        labels:
          data.labels ||
          (period === "Weekly"
            ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
            : ["Week 1", "Week 2", "Week 3", "Week 4"]),
        datasets: [
          {
            label: "Sales",
            data: data.sales || [],
            borderColor: "#049601",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            fill: true,
            tension: 0,
            pointRadius: 0,
          },
        ],
      };

      setChartData(transformedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(timeFrame);
  }, [timeFrame]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Link href="/sales-analytics">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 container lg:mt-12 mt-6 lg:mb-12 mb-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            Sales Analytics
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFrame("Weekly")}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                timeFrame === "Weekly"
                  ? "bg-Main text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFrame("Monthly")}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                timeFrame === "Monthly"
                  ? "bg-Main text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-44 w-full">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : chartData ? (
            <div className="h-full">
              <Line data={chartData} options={options} />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SalesAnalytics;

