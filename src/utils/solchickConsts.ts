export const SOLCHICK_NFT_EXCHANGE_PROGRAM_ID = process.env
  .NEXT_PUBLIC_SOLCHICK_NFT_EXCHANGE_PROGRAM_ID as string;
export const SOLCHICK_DECIMALS_ON_SOL = 9;
export const NFT_EXCHANGE_PROGRAM_IDL = require(`@/idl/nft_exchange.json`);

const URL_BACKEND_BASE = process.env.REACT_APP_BACKEND_URL as string;

export const URL_SERVER_INFO = () => `${URL_BACKEND_BASE}/api/status`;

export const URL_SUBMIT_EGG_UPGRADE = (nftAddress: string) =>
  `${URL_BACKEND_BASE}/api/egg_upgrade/?nft_address=${nftAddress}`;
