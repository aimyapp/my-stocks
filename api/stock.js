export default async function handler(req, res) {
  const symbols = [
    "1605.T",
    "2914.T",
    "03311187.T",
    "0331421A.T"
  ];

  const url =
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" +
    symbols.join(",");

  try {
    const response = await fetch(url);
    const data = await response.json();

    const result = data.quoteResponse.result.map(s => ({
      name: s.shortName || s.symbol,
      price: s.regularMarketPrice
    }));

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}