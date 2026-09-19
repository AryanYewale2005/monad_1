"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { AboutPage } from "@/components/AboutPage";
import { ContractStatusCard } from "@/components/ContractStatusCard";
import { AccessLogForm } from "@/components/AccessLogForm";
import { AccessHistory } from "@/components/AccessHistory";
import { useContractContext } from "@/context/ContractContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "dashboard" | "about">("home");
  const { isConnected, address } = useAccount();
  const { contractAddress } = useContractContext();

  // Listen to URL hash for direct links (e.g. #dashboard, #about, or #home)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "#dashboard") {
        setActiveTab("dashboard");
      } else if (window.location.hash === "#about") {
        setActiveTab("about");
      } else if (window.location.hash === "#home") {
        setActiveTab("home");
      }
    }
  }, []);

  const handleTabChange = (tab: "home" | "dashboard" | "about") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.location.hash = tab;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Universal Top Navbar with Navigation Pills & Wallet */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* View 1: Stunning Presentation Home Page */}
      {activeTab === "home" && (
        <LandingPage
          onNavigateToDashboard={() => handleTabChange("dashboard")}
          onNavigateToAbout={() => handleTabChange("about")}
        />
      )}

      {/* View 2: About Page with Vision, Mission, and Team Members */}
      {activeTab === "about" && (
        <AboutPage onNavigateToDashboard={() => handleTabChange("dashboard")} />
      )}

      {/* View 3: Complete Live Medical Access Logger Dashboard */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Integration Status Highlights */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(59, 130, 246, 0.08))",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(6, 182, 212, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  STEP 1: WALLET
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: isConnected ? "#34d399" : "#e2e8f0" }}>
                  {isConnected ? `Connected: ${address?.substring(0, 6)}...${address?.slice(-4)}` : "Waiting for connection"}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.08))",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(139, 92, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  STEP 2: NETWORK
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#a78bfa" }}>
                  Monad Testnet (Chain ID 10143)
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08))",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-emerald)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  STEP 3: SMART CONTRACT
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#34d399" }}>
                  MedicalAccessLogger Active
                </div>
              </div>
            </div>
          </div>

          {/* Main Two-Column Grid: Blockchain Information & Access Logger Form */}
          <div className="dashboard-grid">
            {/* Left Column: Live Smart Contract Connection & Blockchain Info */}
            <ContractStatusCard />

            {/* Right Column: Live Access Logging Interface */}
            <AccessLogForm />

            {/* Full-width On-Chain Access History Table */}
            <AccessHistory />
          </div>

          {/* Zero PHI Privacy Guarantee Footer Card */}
          <footer
            style={{
              background: "rgba(14, 21, 37, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "14px",
              padding: "1.25rem 1.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🛡
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Zero Protected Health Information (PHI) On-Chain
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  Strict compliance: only immutable cryptographic metadata and access reasons are audited.
                </div>
              </div>
            </div>

            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Contract: {contractAddress.substring(0, 10)}...{contractAddress.slice(-8)}
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
