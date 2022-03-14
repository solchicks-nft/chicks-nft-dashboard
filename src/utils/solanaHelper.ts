import { clusterApiUrl, Connection, PublicKey, Signer } from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import * as anchor from '@project-serum/anchor';
import ConsoleHelper from './consoleHelper';
import { sleep } from './helper';
import BN from 'bn.js';

const PubKeysInternedMap = new Map<string, PublicKey>();

export type Cluster = 'devnet' | 'testnet' | 'mainnet';
export const CLUSTER: Cluster =
  // eslint-disable-next-line no-nested-ternary
  process.env.NEXT_PUBLIC_CLUSTER === `mainnet`
    ? `mainnet`
    : process.env.NEXT_PUBLIC_CLUSTER === `testnet`
    ? `testnet`
    : `devnet`;

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : // eslint-disable-next-line no-nested-ternary
  CLUSTER === `mainnet`
  ? clusterApiUrl(`mainnet-beta`)
  : CLUSTER === `testnet`
  ? clusterApiUrl(`devnet`)
  : `http://localhost:8899`;

export const toPublicKey = (key: string | PublicKey) => {
  if (typeof key !== `string`) {
    return key;
  }

  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }

  return result;
};

export const validatePublicKey = (key: string | PublicKey): boolean => {
  try {
    return PublicKey.isOnCurve(toPublicKey(key).toBuffer());
  } catch (e) {
    return false;
  }
};

export const isAddress = validatePublicKey;

export const pubkeyToString = (key: PublicKey | null | string = ``) =>
  typeof key === `string` ? key : key?.toBase58() || ``;

export const getAssociatedTokenAddress = async (
  mintKey: PublicKey | string,
  ownerKey: PublicKey | string,
): Promise<PublicKey> =>
  Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    toPublicKey(mintKey),
    toPublicKey(ownerKey),
  );

export const getTokenBalance = async (
  connection: Connection,
  pubkey: PublicKey | string,
) =>
  new anchor.BN(
    (await connection.getTokenAccountBalance(toPublicKey(pubkey))).value.amount,
  );

export const getTokenObject = (
  connection: Connection,
  mintKey: PublicKey | string,
  payer: Signer,
) => new Token(connection, toPublicKey(mintKey), TOKEN_PROGRAM_ID, payer);

export const getTransactionInfoOnSol = async (
  connection: Connection,
  txId: string,
  retryCount = 3,
) => {
  let txInfo = null;
  let retry = 0;
  while (retry < retryCount) {
    retry += 1;
    // eslint-disable-next-line no-await-in-loop
    txInfo = await connection.getTransaction(txId);
    if (!txInfo) {
      ConsoleHelper(`getTransactionInfoOnSol: txId: ${txId} - retry: ${retry}`);
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000);
    } else {
      break;
    }
  }
  return txInfo;
};

export const hasNft = async (
  solanaConnection: Connection,
  walletAccount: string | PublicKey,
  nftAddress: string | PublicKey,
) => {
  if (!solanaConnection) {
    return false;
  }

  const associatedKey = await getAssociatedTokenAddress(
    toPublicKey(nftAddress),
    toPublicKey(walletAccount),
  );
  ConsoleHelper(
    `isEnoughNft -> associatedKey: ${pubkeyToString(associatedKey)}`,
  );

  try {
    const nftAmount = await getTokenBalance(solanaConnection, associatedKey);
    if (nftAmount.eq(new BN(1))) {
      return true;
    }
  } catch (e) {
    ConsoleHelper(`isEnoughNftOnSolana: ${e}`);
  }

  return false;
};
