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

//   const fetchData = async (period) => {
//   try {
//     setLoading(true);

//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     if (!token) {
//       throw new Error("Token not found. Please login.");
//     }

//     const response = await fetch(
//       `https://y-balash.vercel.app/api/seller/sales-analytics?period=${period.toLowerCase()}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch ${period} data`);
//     }

//     const data = await response.json();

//     // ✅ هنا أضف السطر دا
//     console.log("Fetched data:", data);

//     const transformedData = {
//   labels: data.chartData.map((entry) => entry.label),
//   datasets: [
//     {
//       label: "Sales",
//       data: data.chartData.map((entry) => entry.value),
//       borderColor: "#049601",
//       backgroundColor: "rgba(76, 175, 80, 0.1)",
//       fill: true,
//       tension: 0,
//       pointRadius: 0,
//     },
//   ],
// };

//     setChartData(transformedData);
//     setLoading(false);
//   } catch (err) {
//     setError(err.message);
//     setLoading(false);
//   }
// };


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
//     <div>
      
//       <Link href="/sales-analytics">
//       <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 container lg:mt-12 mt-6 lg:mb-12 mb-6 w-full">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-medium text-gray-900 mb-6">
//             Sales Analytics
//           </h2>
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

//     </div>
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

const SalesAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("week");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState({
    totalSales: 0,
    totalOrders: 0,
    percentageChange: "0%"
  });

  const fetchData = async (period) => {
    try {
      setLoading(true);
      setError(null);

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("Token not found. Please login.");
      }

      const response = await fetch(
        `https://y-balash.vercel.app/api/seller/sales-analytics?period=${period}`,
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

      // تحويل البيانات لتتناسب مع Chart.js
      const transformedData = {
        labels: data.chartData.map((entry) => entry.label),
        datasets: [
          {
            label: "Sales",
            data: data.chartData.map((entry) => entry.sales),
            borderColor: "#049601",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#049601",
          },
          {
            label: "Orders",
            data: data.chartData.map((entry) => entry.orders),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#3b82f6",
          }
        ],
      };

      setChartData(transformedData);
      setSummaryData({
        totalSales: data.totalSales,
        totalOrders: data.totalOrders,
        percentageChange: data.percentageChange
      });
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
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div>
      <Link href="/sales-analytics">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 container lg:mt-12 mt-6 lg:mb-12 mb-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              Sales Analytics
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFrame("week")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  timeFrame === "week"
                    ? "bg-Main text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeFrame("month")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  timeFrame === "month"
                    ? "bg-Main text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-semibold">
                {summaryData.totalSales.toFixed(2)} EGP
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-semibold">{summaryData.totalOrders}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Change</p>
              <p className="text-xl font-semibold text-green-600">
                {summaryData.percentageChange}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <p>Loading chart data...</p>
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : chartData ? (
              <div className="h-full">
                <Line data={chartData} options={options} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SalesAnalytics;