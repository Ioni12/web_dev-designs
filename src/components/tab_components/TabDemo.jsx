import React, { useState } from "react";

// Simple Tab Component matching Hero style
const Tabs = ({
  tabs,
  defaultActive = 0,
  onTabChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  containerClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  return (
    <div
      className={`flex items-center justify-center space-x-2 ${containerClassName}`}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-200 ${
            activeTab === index
              ? "bg-purple-100 text-gray-900 shadow-lg transform scale-105"
              : "bg-white bg-opacity-50 text-slate-800 hover:bg-opacity-70 border border-zinc-300"
          } ${tabClassName} ${activeTab === index ? activeTabClassName : ""}`}
        >
          <span className="tracking-wide">
            {typeof tab === "string" ? tab : tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// Tab Content Component
const TabContent = ({ children, activeTab, index, className = "" }) => {
  if (activeTab !== index) return null;

  return <div className={`tab-content ${className}`}>{children}</div>;
};

// Demo Usage
const TabDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Features", "Pricing", "Support"];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl mt-22">
          <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="px-8 py-16">
              {/* Tabs */}
              <div className="mb-8">
                <Tabs
                  tabs={tabs}
                  onTabChange={(index, tab) => {
                    setActiveTab(index);
                    console.log(`Tab changed to: ${tab}`);
                  }}
                />
              </div>

              {/* Content */}
              <div className="bg-white bg-opacity-30 rounded-2xl p-8 border border-zinc-300">
                <TabContent activeTab={activeTab} index={0}>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-mono font-bold text-slate-800 tracking-wide">
                      📋 Overview
                    </h3>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                      This is the overview section with general information
                      about our platform and services.
                    </p>
                  </div>
                </TabContent>

                <TabContent activeTab={activeTab} index={1}>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-mono font-bold text-slate-800 tracking-wide">
                      ⚡ Features
                    </h3>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                      Discover powerful features that make our platform stand
                      out from the competition.
                    </p>
                  </div>
                </TabContent>

                <TabContent activeTab={activeTab} index={2}>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-mono font-bold text-slate-800 tracking-wide">
                      💰 Pricing
                    </h3>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                      Simple, transparent pricing that grows with your business
                      needs.
                    </p>
                  </div>
                </TabContent>

                <TabContent activeTab={activeTab} index={3}>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-mono font-bold text-slate-800 tracking-wide">
                      🛟 Support
                    </h3>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                      Get help when you need it with our dedicated support team
                      available 24/7.
                    </p>
                  </div>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDemo;
