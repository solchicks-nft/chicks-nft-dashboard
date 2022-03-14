import { formatUnits } from '@ethersproject/units';
import * as anchor from '@project-serum/anchor';
import { CHAIN_ID_SOLANA, ChainId } from '@/lib/consts';
import { isEVMChain } from '@/lib/array';
import { SOLCHICK_DECIMALS_ON_SOL } from './solchickConsts';
import ConsoleHelper from './consoleHelper';
import { Connection, ParsedAccountData } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  pubkeyToString,
} from '@/utils/solanaHelper';
import BN from 'bn.js';

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

export const isEnoughNftOnSolana = async (
  solanaConnection: Connection,
  nftAddress: string,
  amount: string,
) => {
  if (!solanaConnection) {
    return false;
  }
  const bnNftAmount = new BN(amount);
  const associatedKey = await getAssociatedTokenAddress(
    //SOLCHICK_TOKEN_MINT_ON_SOL,
    nftAddress,
  );
  ConsoleHelper(
    `isEnoughNftOnSolana -> associatedKey: ${pubkeyToString(associatedKey)}`,
  );
  let nftAmount: BN = new BN(0);
  try {
    const parsedAccount = await solanaConnection.getParsedAccountInfo(
      associatedKey,
    );
    if (parsedAccount.value) {
      nftAmount = new BN(
        (
          parsedAccount.value.data as ParsedAccountData
        ).parsed.info.tokenAmount.amount,
      );
      ConsoleHelper(`isEnoughNftOnSolana -> parsedAccount`, parsedAccount);
      ConsoleHelper(
        `isEnoughNftOnSolana -> nftAmount`,
        nftAmount.toString(),
      );
    }
  } catch (e) {
    ConsoleHelper(`isEnoughNftOnSolana: ${e}`);
  }

  if (nftAmount.cmp(bnNftAmount) >= 0) {
  } else {
    return false;
  }
  return true;
};
