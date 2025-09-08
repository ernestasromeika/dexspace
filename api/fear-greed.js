export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical?limit=1",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from CoinMarketCap" });
  }
}