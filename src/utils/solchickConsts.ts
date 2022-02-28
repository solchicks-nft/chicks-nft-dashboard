export const SOLCHICK_NFT_PROGRAM_ID = process.env
  .REACT_APP_SOLCHICK_NFT_PROGRAM_ID as string;

export const SOLCHICK_DECIMALS_ON_SOL = 9;
const URL_BACKEND_BASE = process.env.REACT_APP_BACKEND_URL as string;

const PROGRAM_IDL = require(`../idl/solchick_nft.json`);

export const NFT_PROGRAM_IDL = PROGRAM_IDL;

export const URL_SERVER_INFO = () => `${URL_BACKEND_BASE}/api/status`;

export const URL_SUBMIT_EXCHANGE = (
  address: string,
  amount: number,
  txId: string,
  handle: string,
  xTokenAmount: string,
  startTime = ``,
) =>
  // eslint-disable-next-line max-len
  `${URL_BACKEND_BASE}/api/exchange/?address=${address}&amount=${amount}&tx_id=${txId}&handle=${handle}&x_token=${xTokenAmount}&start_time=${startTime}`;
