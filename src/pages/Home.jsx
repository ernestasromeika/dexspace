import React, { useEffect, useState } from "react";

function Home() {
  const [fearGreed, setFearGreed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndex() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/fear-greed`);
        const data = await res.json();

        if (data && data.data && data.data.length > 0) {
          setFearGreed(data.data[0].value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIndex();
  }, []);

  return (
    <div className="page">
      {/* <h2 className="page-title">Welcome to dexspace</h2> */}

      <div className="fear-greed-box">
        <h3>Current Market Fear & Greed Index</h3>
        {loading ? (
          <p>Loading...</p>
        ) : fearGreed !== null ? (
          <p className="fear-greed-value">{fearGreed}</p>
        ) : (
          <p>Couldn’t fetch data</p>
        )}
      </div>
    </div>
  );
}

export default Home;
