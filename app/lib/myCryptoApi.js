// app/lib/myCryptoApi.js
export async function getMyCryptoData() {
  // 🔥 DEINE GEWÜNSCHTEN COINS - KANNST DU ANPASSEN!
  const myCoinIds = [
    'bitcoin', 'ethereum', 'monero', 'litecoin', 
    'solana', 'cardano', 'polkadot', 'chainlink',
    'dogecoin', 'stellar', 'cosmos', 'avalanche-2',
    'matic-network', 'bitcoin-cash', 'tron', 'uniswap'
  ].join('%2C');

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${myCoinIds}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  );
  return res.json();
}