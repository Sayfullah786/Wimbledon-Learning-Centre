import React from "react";

export const ClubSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 animate-pulse">
    <div className="flex items-start gap-4 mb-5">
      <div className="w-14 h-14 rounded-2xl bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="bg-gray-100 rounded-xl h-24 mb-5" />
    <div className="space-y-2 mb-6">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="h-7 bg-gray-200 rounded-full w-24" />
        <div className="h-7 bg-gray-200 rounded-full w-20" />
      </div>
      <div className="h-9 bg-gray-200 rounded-lg w-28" />
    </div>
  </div>
);
