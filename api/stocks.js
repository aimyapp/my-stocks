export default async function handler(req, res) {
  try {
    const symbols = [
      "1605.T",      // INPEX
      "2914.T",      // JT
      "SPY",         // S&P500 ETF
      "VT"           // 全世界株式ETF（オルカン代替）
    ];

    const apiKey = process.env.ALPHA_VANTAGE_KEY; // 環境変数に入れる
    const results = [];

    for (const symbol of symbols) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // Alpha Vantage のデータ形式に合わせる
      results.push({
        name: symbol,
        price: data["Global Quote"]?.["05. price"] ?? "-"
      });
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}