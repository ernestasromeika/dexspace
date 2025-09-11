import React, { useState } from "react";

function Swap() {
  const [dex, setDex] = useState("uniswap");

  return (
    <div className="page">
      <div class="swap-container">
        <div className="toggle-buttons">
          <button
            onClick={() => setDex("uniswap")}
            className={`toggle-btn ${dex === "uniswap" ? "active" : ""}`}
          >
            Uniswap
          </button>
          <button
            onClick={() => setDex("1inch")}
            className={`toggle-btn ${dex === "1inch" ? "active" : ""}`}
          >
            1inch
          </button>
        </div>

        {dex === "uniswap" && (
          <iframe
            src="https://app.uniswap.org/#/swap"
            title="Uniswap"
            className="dex-iframe"
          />
        )}

        {dex === "1inch" && (
          <iframe
            src="https://app.1inch.io/#/1/swap/ETH/DAI"
            title="1inch"
            className="dex-iframe"
          />
        )}
      </div>
    </div>
  );
}

export default Swap;
