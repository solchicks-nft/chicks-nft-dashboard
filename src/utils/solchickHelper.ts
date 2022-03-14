import { formatUnits } from '@ethersproject/units';
import * as anchor from '@project-serum/anchor';
import { CHAIN_ID_SOLANA, ChainId } from '@/lib/consts';
import { isEVMChain } from '@/lib/array';
import { SOLCHICK_DECIMALS_ON_SOL } from './solchickConsts';

export const toBalanceString = (
  balance: bigint | undefined,
  chainId: ChainId,
) => {
  if (!chainId || balance === undefined) {
    return ``;
  }
  if (isEVMChain(chainId)) {
    return formatUnits(balance, 18); // wei decimals
  }
  if (chainId === CHAIN_ID_SOLANA) {
    return formatUnits(balance, 9); // lamports to sol decimals
  }
  return ``;
};

export const toTokenBalanceString = (
  balance: bigint | undefined | anchor.BN,
  chainId: ChainId = CHAIN_ID_SOLANA,
) => {
  if (!chainId || balance === undefined) {
    return ``;
  }
  if (chainId === CHAIN_ID_SOLANA) {
    let value: bigint;
    if (typeof balance === `bigint`) {
      value = balance;
    } else {
      value = BigInt(balance.toString());
    }
    return formatUnits(value, SOLCHICK_DECIMALS_ON_SOL);
  }
  return ``;
};
