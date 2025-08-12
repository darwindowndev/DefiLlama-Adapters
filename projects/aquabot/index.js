
const httpApiUrl = 'https://stats.aquabot.io/cumulative/solana';

const isEvmAddress = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);

const tvl = async (api) => {
  const { chain, chainId } = api
  const url = `${httpApiUrl}?chainId=${chainId}`;
  const aquaStatsResponse = await fetch(url);
  const resValue = await aquaStatsResponse.json();

  const { tvl: tvlVal } = resValue;

  return {
    solana: tvlVal
  };
}

const chains = ['solana'] 

// ethereum, hyperevm, base, arbitrum, bsc, ton

chains.forEach(chain => {
  module.exports[chain] = { tvl }
})  
module.exports.methodology = 'AquaBot TVL is calculated as the sum of the native currency balances of all the wallets that the user has registered in the platform multiplied by the native price. All the analytics can be queried throguh the aqua stats API.'