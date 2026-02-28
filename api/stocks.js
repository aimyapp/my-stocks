export default async function handler(req, res) {
  try {
    const symbols = ["SPY"]; // テスト用に1つだけ

    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const results = [];

    for (const symbol of symbols) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // デバッグ用ログ
      console.log(`Symbol: ${symbol}`, data);

      const price = data["Global Quote"]?.["05. price"] ?? "-";

      results.push({
        name: symbol,
        price
      });

      // 無料枠制限対策
      await new Promise(r => setTimeout(r, 12000));
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}