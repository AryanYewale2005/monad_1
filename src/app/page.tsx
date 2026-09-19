"use client";

import React, { useState } from "react";

interface AccessRecord {
  id: string;
  patientId: string;
  requester: string;
  reason: string;
  timestamp: string;
  txHash: string;
  blockNumber: number;
  status: "Verified" | "Confirmed" | "Recorded";
}

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [reason, setReason] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [latestTx, setLatestTx] = useState<AccessRecord | null>(null);
  const [history, setHistory] = useState<AccessRecord[]>([]);

  // Sample quick reasons for convenient testing
  const sampleReasons = [
    "Emergency Care Review",
    "Cardiology Follow-up",
    "Prescription Verification",
    "Surgical Clearance",
    "Clinical Research Audit",
  ];

  const handleConnectWallet = () => {
    setIsWalletConnected((prev) => !prev);
  };

  const handleLogAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim() || !reason.trim()) return;

    setIsLogging(true);

    // Simulate blockchain latency (e.g. 600ms on Monad high-throughput EVM)
    setTimeout(() => {
      const now = new Date();
      const formattedTime = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) + " " + now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const randomHex = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      
      const newRecord: AccessRecord = {
        id: "REC-" + Math.floor(100000 + Math.random() * 900000),
        patientId: patientId.trim().toUpperCase(),
        requester: isWalletConnected
          ? "0x742d...44e9 (Dr. Reynolds)"
          : "0x3f98...a12c (Staff Auditor)",
        reason: reason.trim(),
        timestamp: formattedTime,
        txHash: `0x${randomHex}...${Math.floor(1000 + Math.random() * 9000).toString(16)}`,
        blockNumber: 14920800 + Math.floor(Math.random() * 500),
        status: "Verified",
      };

      setLatestTx(newRecord);
      setHistory((prev) => [newRecord, ...prev]);
      setPatientId("");
      setReason("");
      setIsLogging(false);
    }, 600);
  };

  const resetToInitialState = () => {
    setLatestTx(null);
    setHistory([]);
    setPatientId("");
    setReason("");
  };

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
              Blockchain-Based Medical Data Access Auditing
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            id="connect-wallet-btn"
            className={`btn-wallet ${isWalletConnected ? "connected" : ""}`}
            onClick={handleConnectWallet}
            aria-label="Connect or disconnect Web3 wallet"
          >
            {/* Wallet SVG Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
            <span>
              {isWalletConnected
                ? "Connected: 0x742d...44e9"
                : "Connect Wallet"}
            </span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Grid: Access Patient Record & Transaction Status */}
      <div className="dashboard-grid">
        {/* Section 1: Access Patient Record */}
        <section
          className="panel-card"
          aria-labelledby="access-record-title"
        >
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
              Access Patient Record
            </h2>
            <span className="card-badge">Cryptographic Log</span>
          </div>

          <form className="access-form" onSubmit={handleLogAccess}>
            <div className="form-group">
              <label htmlFor="patient-id-input" className="form-label">
                <span>Patient Record ID</span>
                <span className="req">*Required</span>
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
                  placeholder="e.g. PAT-9042 or 8d92a1"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason-input" className="form-label">
                <span>Reason for Access</span>
                <span className="req">*Required</span>
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
                  required
                />
              </div>
              <div className="quick-reasons">
                {sampleReasons.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="quick-chip"
                    onClick={() => setReason(r)}
                  >
                    + {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="log-access-btn"
              type="submit"
              className="btn-log-access"
              disabled={isLogging || !patientId.trim() || !reason.trim()}
            >
              {isLogging ? (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="spin"
                    style={{ animation: "spin 1s linear infinite" }}
                  >
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                  <span>Broadcasting to Ledger...</span>
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>LOG ACCESS</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Section 2: Transaction Status */}
        <section
          className="panel-card"
          aria-labelledby="tx-status-title"
        >
          <div className="card-title-row">
            <h2 id="tx-status-title">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Transaction Status
            </h2>
            <span className="card-badge">Live Ledger State</span>
          </div>

          <div className="tx-status-content">
            {!latestTx ? (
              /* Initial State Required: "No transaction yet" */
              <div className="tx-empty-state">
                <div className="tx-empty-icon">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <p>No transaction yet</p>
                <span className="tx-empty-sub">
                  Submit an access request to generate a tamper-evident blockchain audit hash.
                </span>
              </div>
            ) : (
              <div className="tx-live-card">
                <div className="tx-live-header">
                  <span className="tx-status-pill">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Confirmed on Blockchain
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Block #{latestTx.blockNumber}
                  </span>
                </div>

                <div className="tx-field-grid">
                  <div className="tx-field">
                    <span className="tx-field-label">Transaction Hash</span>
                    <span className="tx-field-val highlight">
                      {latestTx.txHash}
                    </span>
                  </div>
                  <div className="tx-field">
                    <span className="tx-field-label">Timestamp</span>
                    <span className="tx-field-val">
                      {latestTx.timestamp}
                    </span>
                  </div>
                  <div className="tx-field">
                    <span className="tx-field-label">Patient Record</span>
                    <span className="tx-field-val">
                      {latestTx.patientId}
                    </span>
                  </div>
                  <div className="tx-field">
                    <span className="tx-field-label">Network Consensus</span>
                    <span className="tx-field-val" style={{ color: "#34d399" }}>
                      Monad Parallel EVM (Finalized)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Section 3: Access History */}
      <section
        className="panel-card history-section"
        aria-labelledby="access-history-title"
      >
        <div className="card-title-row">
          <h2 id="access-history-title">
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Access History
          </h2>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span className="card-badge">
              {history.length} {history.length === 1 ? "Record" : "Records"}
            </span>
            {history.length > 0 && (
              <button
                className="reset-btn"
                onClick={resetToInitialState}
                title="Reset back to empty state"
              >
                Clear / Reset
              </button>
            )}
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Requester</th>
                <th>Reason</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                /* Initial State Required: "No access records yet." */
                <tr className="table-empty-row">
                  <td colSpan={5}>
                    <div className="table-empty-box">
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <p style={{ fontWeight: 500, fontSize: "1rem" }}>
                        No access records yet.
                      </p>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Access events will be recorded here with verifiable on-chain metadata.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                history.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <span className="id-badge">{record.patientId}</span>
                    </td>
                    <td>
                      <div className="requester-cell">
                        <span className="requester-avatar"></span>
                        <span>{record.requester}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{record.reason}</td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.83rem" }}>
                      {record.timestamp}
                    </td>
                    <td>
                      <span className="badge-status-verified">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Security Information */}
      <aside
        className="security-banner"
        aria-label="Security and privacy architecture notice"
      >
        <div className="security-icon-circle" aria-hidden="true">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="security-content">
          <span className="security-tag">HIPAA Compliant Architecture</span>
          <p className="security-message">
            Medical records remain securely off-chain. Only access metadata is recorded on the blockchain.
          </p>
          <div className="security-architecture-pills">
            <span className="arch-pill off-chain">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
              Off-Chain: PHI & Clinical Notes (AES-256 Encrypted)
            </span>
            <span className="arch-pill on-chain">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              On-Chain: Immutable Access Hashes & Timestamps
            </span>
          </div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="app-footer">
        <div>
          <span>MedAccess Security Node • Monad High-Throughput EVM</span>
        </div>
        <div>
          <span>Zero-Knowledge Audit Trail • End-to-End Integrity</span>
        </div>
      </footer>
    </div>
  );
}
