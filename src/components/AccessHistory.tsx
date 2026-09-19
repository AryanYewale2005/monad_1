"use client";

import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { MEDICAL_ACCESS_LOGGER_ABI } from "@/config/contract";
import { MONAD_TESTNET_CHAIN_ID } from "@/config/monad";
import { useContractContext } from "@/context/ContractContext";

interface RawAccessLog {
  requester: string;
  patientId: string;
  reason: string;
  timestamp: bigint;
}

export function AccessHistory() {
  const { contractAddress, refreshTrigger } = useContractContext();

  // Read all logs from smart contract
  const {
    data: rawLogs,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    functionName: "getAllLogs",
    chainId: MONAD_TESTNET_CHAIN_ID,
  });

  // Automatically refetch when a new log is submitted and confirmed
  useEffect(() => {
    if (refreshTrigger > 0) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const logs = (rawLogs as RawAccessLog[] | undefined) || [];

  // Format timestamp helper
  const formatTimestamp = (ts: bigint) => {
    try {
      const date = new Date(Number(ts) * 1000);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "Unknown";
    }
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <section className="panel-card" aria-labelledby="access-history-title" style={{ gridColumn: "1 / -1" }}>
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
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          On-Chain Access Audit History
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => refetch()}
            title="Refresh logs from Monad Testnet"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              padding: "0.25rem 0.55rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Refresh
          </button>
          <span
            className="card-badge"
            style={{
              background: "rgba(6, 182, 212, 0.12)",
              color: "#38bdf8",
              borderColor: "rgba(6, 182, 212, 0.3)",
            }}
          >
            {logs.length} {logs.length === 1 ? "Record" : "Records"}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            padding: "3rem 1rem",
            textAlign: "center",
            color: "var(--text-muted)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "2px solid var(--accent-cyan)",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
          <span>Querying audit records from Monad Testnet...</span>
        </div>
      ) : isError ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "#fca5a5",
            background: "rgba(239, 68, 68, 0.08)",
            borderRadius: "10px",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          Failed to fetch logs from contract. Ensure the contract is deployed to Monad Testnet.
        </div>
      ) : logs.length === 0 ? (
        <div
          style={{
            padding: "3rem 1rem",
            textAlign: "center",
            color: "var(--text-muted)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ opacity: 0.3 }}
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p style={{ fontSize: "0.95rem" }}>No access records yet</p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Log access above using patient ID and reason to generate the first on-chain audit trail.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.86rem",
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
                  letterSpacing: "0.05em",
                }}
              >
                <th style={{ padding: "0.75rem 1rem" }}>#</th>
                <th style={{ padding: "0.75rem 1rem" }}>Patient ID</th>
                <th style={{ padding: "0.75rem 1rem" }}>Reason for Access</th>
                <th style={{ padding: "0.75rem 1rem" }}>Requester Wallet</th>
                <th style={{ padding: "0.75rem 1rem" }}>Timestamp</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Display newest logs first */}
              {logs
                .map((log, index) => ({ log, originalIndex: index }))
                .reverse()
                .map(({ log, originalIndex }) => (
                  <tr
                    key={originalIndex}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      #{originalIndex + 1}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontWeight: 600, color: "var(--accent-cyan)" }}>
                      <span
                        style={{
                          background: "rgba(6, 182, 212, 0.1)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(6, 182, 212, 0.25)",
                        }}
                      >
                        {log.patientId}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "var(--text-primary)" }}>
                      {log.reason}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                      <a
                        href={`https://testnet.monadexplorer.com/address/${log.requester}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--text-highlight)", textDecoration: "none" }}
                        title={log.requester}
                      >
                        {shortenAddress(log.requester)} ↗
                      </a>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                      <span
                        style={{
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#6ee7b7",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      >
                        Verified
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
