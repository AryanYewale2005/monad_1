"use client";

import React from "react";
import { useAccount } from "wagmi";
import { WalletButton } from "@/components/WalletButton";
import { ContractStatusCard } from "@/components/ContractStatusCard";
import { AccessLogForm } from "@/components/AccessLogForm";
import { AccessHistory } from "@/components/AccessHistory";
import { useContractContext } from "@/context/ContractContext";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { contractAddress } = useContractContext();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon-wrapper" aria-hidden="true">
            {/* Medical Shield Icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <div className="brand-titles">
            <h1>
              Medical Data Access Logger
              <span className="badge-chain">
                <span className="pulse-dot"></span>
                Monad Testnet
              </span>
            </h1>
            <p className="subtitle">
              Decentralized Audit Trail • Zero PHI On-Chain • Real-Time EVM Logging
            </p>
          </div>
        </div>

        <div className="header-actions">
          <WalletButton />
        </div>
      </header>

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

      {/* Main Grid: Smart Contract Status & Access Logger Form */}
      <div className="dashboard-grid">
        {/* Left Column: Live Smart Contract Connection via Wagmi / Viem */}
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
  );
}
