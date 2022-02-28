/* eslint-disable @typescript-eslint/no-use-before-define,no-nested-ternary,no-empty */
import { PublicKey } from '@solana/web3.js';
import { arrayify, zeroPad } from '@ethersproject/bytes';

import {
  CHAIN_ID_AVAX,
  CHAIN_ID_BSC,
  CHAIN_ID_ETH,
  CHAIN_ID_ETHEREUM_ROPSTEN,
  CHAIN_ID_POLYGON,
  CHAIN_ID_SOLANA,
  ChainId,
} from './consts';

export const isEVMChain = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH ||
  chainId === CHAIN_ID_BSC ||
  chainId === CHAIN_ID_ETHEREUM_ROPSTEN ||
  chainId === CHAIN_ID_AVAX ||
  chainId === CHAIN_ID_POLYGON;

export const isHexNativeTerra = (h: string) => h.startsWith(`01`);
export const uint8ArrayToHex = (a: Uint8Array) =>
  Buffer.from(a).toString(`hex`);
export const hexToUint8Array = (h: string) =>
  new Uint8Array(Buffer.from(h, `hex`));

export const nativeToHexString = (
  address: string | undefined,
  chain: ChainId,
) => {
  if (!address || !chain) {
    return null;
  }

  if (isEVMChain(chain)) {
    return uint8ArrayToHex(zeroPad(arrayify(address), 32));
  }
  if (chain === CHAIN_ID_SOLANA) {
    return uint8ArrayToHex(zeroPad(new PublicKey(address).toBytes(), 32));
  }
  return null;
};
