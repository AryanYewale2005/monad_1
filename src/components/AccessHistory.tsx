"use client";

import React, { useEffect, useState } from "react";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { MEDICAL_ACCESS_LOGGER_ABI } from "@/config/contract";
import { MONAD_TESTNET_CHAIN_ID } from "@/config/monad";
import { useContractContext } from "@/context/ContractContext";

interface AccessRecord {
  requester: string;
  patientId: string;
  reason: string;
  timestamp: bigint;
}

export function AccessHistory() {
  const { contractAddress, refreshTrigger } = useContractContext();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Read all logs from the smart contract
  const {
    data: rawLogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    functionName: "getAllLogs",
    chainId: MONAD_TESTNET_CHAIN_ID,
  });

  // Watch for real-time AccessLogged events on Monad Testnet
  useWatchContractEvent({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    eventName: "AccessLogged",
    chainId: MONAD_TESTNET_CHAIN_ID,
    onLogs() {
      refetch();
    },
  });

  // Automatically refetch when triggered by a new transaction confirmation
  useEffect(() => {
    refetch();
  }, [refreshTrigger, refetch]);

  const logs = (rawLogs as AccessRecord[] | undefined) || [];

  // Format timestamp into readable date and time
  const formatDateTime = (ts: bigint) => {
    try {
      const date = new Date(Number(ts) * 1000);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return "Invalid Timestamp";
    }
  };

  // Format shortened wallet address (e.g. 0x82A7...91F)
  const shortenAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <section
      className="panel-card"
      aria-labelledby="access-history-title"
      style={{ gridColumn: "1 / -1", marginTop: "0.5rem" }}
      id="access-history-section"
    >
      {/* Card Header */}
      <div className="card-title-row">
        <h2 id="access-history-title">
          <svg
            className="icon"
            width="22"
            height="22"
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
          Access History
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => refetch()}
            title="Refresh access records from Monad Testnet"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              padding: "0.35rem 0.75rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Refresh
          </button>

          <span
            className="card-badge"
            style={{
              background: "rgba(6, 182, 212, 0.12)",
              color: "#38bdf8",
              borderColor: "rgba(6, 182, 212, 0.35)",
              padding: "0.35rem 0.75rem",
              fontSize: "0.8rem",
            }}
          >
            {logs.length} {logs.length === 1 ? "Record" : "Records"}
          </span>
        </div>
      </div>

      {/* Security Banner Requirement: Medical records remain securely off-chain */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08))",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.84rem",
          color: "#a7f3d0",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>🔒</span>
        <span>
          <strong>Security Notice:</strong> Medical records remain securely off-chain. Only access metadata is recorded on the blockchain.
        </span>
      </div>

      {/* State: Loading */}
      {isLoading && logs.length === 0 ? (
        <div
          style={{
            padding: "3.5rem 1rem",
            textAlign: "center",
            color: "var(--text-secondary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.9rem",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "3px solid var(--accent-cyan)",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontSize: "0.92rem", fontWeight: 500 }}>
            Retrieving access events from Monad Testnet blockchain...
          </span>
        </div>
      ) : isError ? (
        /* State: Error */
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "#fca5a5",
            background: "rgba(239, 68, 68, 0.08)",
            borderRadius: "10px",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>⚠️</span>
          <div>
            <strong>Failed to retrieve blockchain access events</strong>
            <div style={{ fontSize: "0.8rem", color: "#fecaca", marginTop: "0.25rem" }}>
              {error?.message || "Please verify your network connection to Monad Testnet."}
            </div>
          </div>
          <button
            onClick={() => refetch()}
            style={{
              padding: "0.45rem 1rem",
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            Retry Query
          </button>
        </div>
      ) : logs.length === 0 ? (
        /* State: Empty */
        <div
          style={{
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            color: "var(--text-muted)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "var(--text-muted)",
            }}
          >
            📋
          </div>
          <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>
            No access records yet
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "420px" }}>
            Submit an access request using the form above (e.g. <code>P001</code> & <code>Emergency Treatment</code>) to generate an immutable on-chain audit entry.
          </p>
        </div>
      ) : (
        /* Access History Table - Displaying newest records first */
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.88rem",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <th style={{ padding: "0.85rem 1rem" }}>Patient ID</th>
                <th style={{ padding: "0.85rem 1rem" }}>Requester Wallet</th>
                <th style={{ padding: "0.85rem 1rem" }}>Reason</th>
                <th style={{ padding: "0.85rem 1rem" }}>Timestamp</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs
                .map((log, index) => ({ log, originalIndex: index }))
                .reverse() // Requirement: Newest records first
                .map(({ log, originalIndex }) => (
                  <tr
                    key={originalIndex}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.025)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {/* Patient ID */}
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          background: "rgba(6, 182, 212, 0.12)",
                          color: "#38bdf8",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "0.84rem",
                        }}
                      >
                        {log.patientId}
                      </span>
                    </td>

                    {/* Requester Wallet (shortened) */}
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <a
                          href={`https://testnet.monadexplorer.com/address/${log.requester}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${log.requester} on MonadExplorer`}
                          style={{
                            color: "var(--text-highlight)",
                            textDecoration: "none",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.84rem",
                          }}
                        >
                          {shortenAddress(log.requester)}
                        </a>
                        <button
                          onClick={() => handleCopy(log.requester)}
                          title="Copy address"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: copiedAddress === log.requester ? "#34d399" : "var(--text-muted)",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            padding: "0 0.2rem",
                          }}
                        >
                          {copiedAddress === log.requester ? "✓" : "❐"}
                        </button>
                      </div>
                    </td>

                    {/* Reason */}
                    <td style={{ padding: "1rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {log.reason}
                    </td>

                    {/* Timestamp */}
                    <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                      {formatDateTime(log.timestamp)}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <span
                        style={{
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#6ee7b7",
                          border: "1px solid rgba(16, 185, 129, 0.35)",
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#10b981",
                            boxShadow: "0 0 6px #10b981",
                          }}
                        />
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
