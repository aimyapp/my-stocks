export default async function handler(req, res) {
  try {
    const symbols = [
      "1605.T",      // INPEX
      "2914.T",      // JT
      "SPY",         // S&P500 ETF
      "VT"           // 全世界株式ETF（オルカン代替）
    ];

    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const results = [];

    // 無料枠の制限（1分間5回）対策で少し待機を入れる
    for (const symbol of symbols) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // デバッグ用にVercelログに出力
      console.log(`Symbol: ${symbol}`);
      console.log(data);

      // Alpha Vantage のデータ形式に合わせる
      const price = data["Global Quote"]?.["05. price"] ?? "-";

      results.push({
        name: symbol,
        price
      });

      // 無料枠の制限に引っかからないよう12秒待機
      await new Promise(r => setTimeout(r, 12000));
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}