import { useState } from "react";
import { TrendingUp, BarChart3, PieChart } from "lucide-react";

export function AnalyticsPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Analytics</h1>
            <p className="text-sm text-dark-secondary mt-1">Advanced analytics and reporting for your warranty business</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-dark-secondary mx-auto mb-4" />
          <h3 className="text-xl font-medium text-dark-primary mb-2">Advanced Analytics</h3>
          <p className="text-dark-secondary">Detailed analytics and business intelligence reports coming soon</p>
        </div>
      </main>
    </>
  );
}