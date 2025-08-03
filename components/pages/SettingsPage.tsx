import { useState } from "react";
import { Settings, User, Bell, Shield } from "lucide-react";

export function SettingsPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Settings</h1>
            <p className="text-sm text-dark-secondary mt-1">Configure your warranty management system</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-dark-secondary mx-auto mb-4" />
          <h3 className="text-xl font-medium text-dark-primary mb-2">System Settings</h3>
          <p className="text-dark-secondary">Configuration options and system settings coming soon</p>
        </div>
      </main>
    </>
  );
}