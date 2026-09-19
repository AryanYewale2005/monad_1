import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { monadTestnet } from "./monad";

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected(),
  ],
  transports: {
    [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
