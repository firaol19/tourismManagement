"use client";

import React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicRadialBarChart = dynamic(() => import('./TaskPerformanceChart'), {
  ssr: false
});

const TaskPerformance: React.FC = () => {
  return (
    <div className="max-w-[400px] mx-auto bg-white shadow-lg shadow-main rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-primary font-serif">Tasks Performance</h2>
      <div className="flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicRadialBarChart />
        </Suspense>
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-lg font-semibold">
        <div className="text-green-600 text-center">
          <span className="text-2xl">55%</span>
          <p className="text-sm text-gray-500 font-roboto">Completed</p>
        </div>
        <div className="text-yellow-500 text-center">
          <span className="text-2xl">32%</span>
          <p className="text-sm text-gray-500 font-roboto">In-Progress</p>
        </div>
        <div className="text-red-500 text-center">
          <span className="text-2xl">13%</span>
          <p className="text-sm text-gray-500 font-roboto">Behind</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPerformance;