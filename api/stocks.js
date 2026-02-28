export default async function handler(req, res) {
  try {
    const symbols = [
      "1605.T",
      "2914.T",
      "03311187.T",
      "0331421A.T"
    ];

    const url =
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" +
      symbols.join(",");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      console.error("Yahoo API error:", response.status);
      return res.status(response.status).json({
        error: "Yahoo API error",
        status: response.status
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}