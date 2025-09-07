import React, { useEffect } from "react";

// 🔹 1inch widget component
function OneInchWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@1inch/limit-order-widget@latest/dist/limit-order-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="dex-widget">
      <h2>1inch Swap</h2>
      <div
        className="oneinch-widget"
        style={{ width: "100%", height: "600px" }}
        data-chain="1"
        data-from-token="ETH"
        data-to-token="DAI"
      ></div>
    </div>
  );
}

// 🔹 Uniswap iframe component
function UniswapIframe() {
  return (
    <div className="dex-widget">
      <h2>Uniswap Swap</h2>
      <iframe
        src="https://app.uniswap.org/#/swap?chain=mainnet&theme=dark"
        title="Uniswap"
        style={{
          border: "none",
          borderRadius: "12px",
          width: "100%",
          height: "600px",
        }}
      ></iframe>
    </div>
  );
}
//https://rango.exchange/?tokenIn=ETH&tokenOut=USDT&amount=1&from=ethereum&to=polygon

// 🔹 Main App
export default function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>DEXSpace – Swap Portal</h1>
        {/* <OneInchWidget /> */}
        <UniswapIframe />
      </div>
    </div>
  );
}