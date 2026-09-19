"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { monadTestnet, MONAD_TESTNET_CHAIN_ID } from "@/config/monad";

export function WalletButton() {
  const [hasEthereum, setHasEthereum] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const { address, isConnected, isConnecting } = useAccount();
  const currentChainId = useChainId();
  const { connectors, connect, isPending: isConnectPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching, error: switchError } = useSwitchChain();

  // Detect ethereum provider in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasEthereum(Boolean((window as unknown as { ethereum?: unknown }).ethereum));
    }
  }, []);

  // Sync connection error messages
  useEffect(() => {
    if (connectError) {
      if (
        connectError.name === "UserRejectedRequestError" ||
        connectError.message.toLowerCase().includes("reject") ||
        connectError.message.toLowerCase().includes("denied")
      ) {
        setErrorMessage("Connection rejected in wallet. Please approve to connect.");
      } else {
        setErrorMessage(connectError.message || "Failed to connect wallet.");
      }
    } else if (switchError) {
      if (
        switchError.name === "UserRejectedRequestError" ||
        switchError.message.toLowerCase().includes("reject")
      ) {
        setErrorMessage("Network switch request was rejected in wallet.");
      } else {
        setErrorMessage(switchError.message || "Failed to switch to Monad Testnet.");
      }
    }
  }, [connectError, switchError]);

  const isWrongNetwork = isConnected && currentChainId !== MONAD_TESTNET_CHAIN_ID;

  const handleConnect = () => {
    setErrorMessage(null);

    if (hasEthereum === false) {
      setErrorMessage("No Web3 wallet detected. Please install MetaMask or another EVM browser extension.");
      return;
    }

    // Pick first injected or available connector
    const connector = connectors.find((c) => c.id === "injected" || c.id === "metaMask") || connectors[0];

    if (connector) {
      connect({ connector, chainId: MONAD_TESTNET_CHAIN_ID });
    } else {
      setErrorMessage("No compatible wallet connector found.");
    }
  };

  const handleSwitchNetwork = () => {
    setErrorMessage(null);
    switchChain({ chainId: MONAD_TESTNET_CHAIN_ID });
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="wallet-controller" style={{ position: "relative" }}>
      {/* Error alert banner if any */}
      {errorMessage && (
        <div
          className="wallet-error-toast"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            zIndex: 100,
            background: "rgba(239, 68, 68, 0.95)",
            color: "#ffffff",
            padding: "0.6rem 1rem",
            borderRadius: "10px",
            fontSize: "0.82rem",
            boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            minWidth: "280px",
            maxWidth: "360px",
          }}
        >
          <span style={{ flex: 1 }}>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "1rem",
            }}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* When wallet is connected */}
      {isConnected && address ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Wrong Network Indicator & Switch Button */}
          {isWrongNetwork ? (
            <button
              onClick={handleSwitchNetwork}
              disabled={isSwitching}
              className="btn-wallet"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                borderColor: "rgba(239, 68, 68, 0.5)",
                color: "#fca5a5",
              }}
              title="Click to switch to Monad Testnet"
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                }}
              />
              {isSwitching ? "Switching Network..." : "Wrong Network! Switch to Monad"}
            </button>
          ) : (
            <div
              className="badge-chain"
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                borderColor: "rgba(16, 185, 129, 0.35)",
                color: "#6ee7b7",
                padding: "0.4rem 0.75rem",
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              Monad Testnet ({currentChainId})
            </div>
          )}

          {/* Connected Address Button with Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="btn-wallet connected"
              aria-expanded={showDropdown}
            >
              <svg
                width="16"
                height="16"
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
              <span>{shortenAddress(address)}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: showDropdown ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Account Details Dropdown */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: "240px",
                  background: "var(--bg-card)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  zIndex: 90,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ padding: "0.25rem 0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Connected Wallet</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: "var(--text-primary)",
                      marginTop: "2px",
                      wordBreak: "break-all",
                    }}
                  >
                    {address}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: "0.5rem",
                  }}
                >
                  <button
                    onClick={copyAddress}
                    style={{
                      flex: 1,
                      padding: "0.45rem",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    {copied ? "✓ Copied" : "Copy Address"}
                  </button>
                  <button
                    onClick={() => {
                      disconnect();
                      setShowDropdown(false);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.45rem",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "8px",
                      color: "#fca5a5",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Not connected state */
        <button
          onClick={handleConnect}
          disabled={isConnecting || isConnectPending}
          className="btn-wallet"
          id="connect-wallet-btn"
        >
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
            {isConnecting || isConnectPending ? "Connecting Wallet..." : "Connect Wallet"}
          </span>
        </button>
      )}
    </div>
  );
}
