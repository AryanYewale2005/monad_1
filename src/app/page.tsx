"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { WalletButton } from "@/components/WalletButton";
import { ContractStatusCard } from "@/components/ContractStatusCard";
import { MEDICAL_ACCESS_LOGGER_ADDRESS } from "@/config/contract";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [patientId, setPatientId] = useState("");
  const [reason, setReason] = useState("");

  const sampleReasons = [
    "Emergency Care Review",
    "Cardiology Consultation",
    "Prescription Audit",
    "Pre-Surgical Clearance",
    "HIPAA Compliance Verification",
  ];

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
              Active on Monad Testnet
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Smart Contract Status & Access Logger Preview */}
      <div className="dashboard-grid">
        {/* Left Column: Live Smart Contract Connection via Wagmi / Viem */}
        <ContractStatusCard />

        {/* Right Column: Access Logging Interface (Prepared for Next Step) */}
        <section className="panel-card" aria-labelledby="access-record-title">
          <div className="card-title-row">
            <h2 id="access-record-title">
              <svg
                className="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Access Log Entry
            </h2>
            <span
              className="card-badge"
              style={{
                background: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                borderColor: "rgba(56, 189, 248, 0.25)",
              }}
            >
              Contract Write Ready
            </span>
          </div>

          <div
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              borderRadius: "10px",
              padding: "0.85rem 1rem",
              fontSize: "0.84rem",
              color: "#fcd34d",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Flow Checkpoint:</strong> Wallet & Contract connectivity is active. The{" "}
              <code>logAccess</code> on-chain transaction execution will be wired in the upcoming step.
            </div>
          </div>

          <form
            className="access-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-group">
              <label htmlFor="patient-id-input" className="form-label">
                <span>Patient Record ID / Reference</span>
                <span className="req">*Off-chain Reference Only</span>
              </label>
              <div className="input-container">
                <svg
                  className="input-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="patient-id-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. PAT-9042 or REF-8821"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  disabled={!isConnected}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason-input" className="form-label">
                <span>Reason for Access</span>
                <span className="req">*Audit Trail Justification</span>
              </label>
              <div className="input-container">
                <svg
                  className="input-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <input
                  id="reason-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Emergency Care Consultation"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={!isConnected}
                />
              </div>
              <div className="quick-reasons">
                {sampleReasons.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="tag-btn"
                    onClick={() => setReason(r)}
                    disabled={!isConnected}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              disabled={true}
              style={{
                opacity: 0.7,
                cursor: "not-allowed",
              }}
              title="logAccess transaction will be activated in the next step"
            >
              <span>logAccess() Ready for Activation</span>
            </button>
          </form>
        </section>
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
          Contract: {MEDICAL_ACCESS_LOGGER_ADDRESS.substring(0, 10)}...{MEDICAL_ACCESS_LOGGER_ADDRESS.slice(-8)}
        </div>
      </footer>
    </div>
  );
}
