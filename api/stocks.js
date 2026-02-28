export default async function handler(req, res) {
  try {
    // 銘柄コードと表示名をセットで管理
    const symbols = [
      { symbol: "1605.T", name: "INPEX" },
      { symbol: "1928.T", name: "積水ハウス" },
      { symbol: "2914.T", name: "日本たばこ産業" },
      { symbol: "4613.T", name: "関西ペイント" },
      { symbol: "6417.T", name: "SANKYO" },
      { symbol: "8058.T", name: "三菱商事" },
      { symbol: "8267.T", name: "イオン" },
      { symbol: "8766.T", name: "東京海上HD" },
      { symbol: "9104.T", name: "商船三井" },
      { symbol: "9432.T", name: "NTT" },
      { symbol: "9984.T", name: "ソフトバンク" },
      { symbol: "SPY", name: "S&P500 ETF" },
      { symbol: "VT", name: "全世界株式ETF" }
    ];

    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const results = [];

    for (const s of symbols) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${s.symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // デバッグ用ログ
      console.log(`Symbol: ${s.symbol}`, data);

      // Alpha Vantage のデータ形式に合わせる
      const price = data["Global Quote"]?.["05. price"] ?? "-";

      results.push({
        name: s.name,
        price
      });

      // 無料枠制限対策（1分に5回まで）
      await new Promise(r => setTimeout(r, 12000));
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}