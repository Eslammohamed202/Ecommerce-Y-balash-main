'use client';

import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
);

const SalesCharts = () => {
  // Data for the Line Chart (Revenue Trends)
  const lineData = {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    datasets: [
      {
        label: '2024',
        data: [8.2, 8.1, 8.5, 8.1, 8.4, 8.4],
        borderColor: '#1C573E',
        backgroundColor: '#1C573E',
        borderWidth: 2,
        yAxisID: 'y',
        tension: 0.4,
      },
      {
        label: '2025',
        data: [8.0, 8.3, 8.1, 8.5, 8.2, 8.2],
        borderColor: '#F4C430',
        backgroundColor: '#F4C430',
        borderWidth: 2,
        borderDash: [5, 5],
        yAxisID: 'y',
        tension: 0.4,
      },
    ],
  };

  // Options for the Line Chart
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch to fill the container
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value}M`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        min: 8.0,
        max: 8.6,
        ticks: {
          callback: (value) => `$${value}M`,
        },
        title: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light gray grid lines
          drawBorder: false, // No border line on the axis
          drawTicks: false, // No tick marks extending outside
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 150,
        ticks: {
          callback: (value) => `${value}`,
        },
        title: {
          display: false,
        },
        grid: {
          drawOnChartArea: false, // No grid lines for the right Y-axis
        },
      },
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false, // No vertical grid lines for the X-axis
        },
      },
    },
  };

  // Data for the Donut Chart (New Customer)
  const donutData = {
    labels: ['New customer', 'Returning customer'],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ['#FFC433', '#1C573E'],
        borderWidth: 0,
      },
    ],
  };

  // Options for the Donut Chart
 const donutOptions = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,      
        pointStyle: 'rectRounded',
        boxWidth: 12,             
        padding: 10,              
        font: {
          size: 12,               
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};


  return (
    <div className="container p-6 rounded-lg flex lg:flex-row flex-col justify-between items-start gap-6">
      {/* Revenue Trends Section */}
      <div className="bg-white p-4 rounded-lg lg:w-3/4">
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-lg font-semibold text-[#1C573E]">Revenue Trends</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1C573E] text-white rounded-md text-sm">
              Revenue
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-sm">
              Orders
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-sm">
              Units
            </button>
          </div>
        </div>
        <div className="h-72 w-full">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* New Customer Section */}
      <div className="bg-white p-4 rounded-lg lg:w-1/4 w-full">
        <h2 className="text-lg font-semibold text-[#1C573E] mb-4">New Customer</h2>

        <div className="relative flex justify-center items-center w-full max-w-[250px] mx-auto aspect-square gap-2">
          <Doughnut data={donutData} options={donutOptions} />

          <div className="absolute text-center ">
            <p className="text-lg font-semibold text-[#F4C430]">20K</p>
            <p className="text-sm text-gray-500">New customer</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SalesCharts;