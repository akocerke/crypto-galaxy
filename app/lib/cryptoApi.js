// app/lib/cryptoApi.js
export async function getCryptoData(currency = 'eur') {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`);
  return res.json();
}