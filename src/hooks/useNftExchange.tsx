import {
  INft,
  NftErrorCode,
  NftStatus,
  TokenErrorCode,
  TokenStatusCode,
} from '@/utils/nftConsts';
import { useState } from 'react';

const createNftExchangeStatus = (
  selectedNft: INft | undefined,
  selectedNfts: INft[],
  shardsDeposit: number,
  chicksDeposit: number,
  shardsDepositStatusCode: TokenStatusCode,
  chicksDepositStatusCode: TokenStatusCode,
  chicksDepositErrorCode: TokenErrorCode,
  shardsDepositErrorCode: TokenErrorCode,
  nftStatusCode: NftStatus,
  nftErrorCode: NftErrorCode,
) => ({
  selectedNft,
  selectedNfts,
  shardsDeposit,
  chicksDeposit,
  shardsDepositStatusCode,
  chicksDepositStatusCode,
  chicksDepositErrorCode,
  shardsDepositErrorCode,
  nftStatusCode,
  nftErrorCode,
});

interface INftExchange {
  selectedNft: INft | undefined;
  selectedNfts: INft[];
  shardsDeposit: number;
  chicksDeposit: number;
  shardsDepositStatusCode: TokenStatusCode;
  chicksDepositStatusCode: TokenStatusCode;
  chicksDepositErrorCode: TokenErrorCode;
  shardsDepositErrorCode: TokenErrorCode;
  nftStatusCode: NftStatus;
  nftErrorCode: NftErrorCode;
}

function useNftExchange(): INftExchange {
  const [selectedNft, setSelectedNft] = useState<INft | undefined>();
  const [selectedNfts, setSelectedNfts] = useState<INft[]>([]);
  const [shardsDeposit, setShardsDeposit] = useState(0);
  const [chicksDeposit, setChicksDeposit] = useState(0);
  const [shardsDepositStatusCode, setShardsDepositStatusCode] = useState(
    TokenStatusCode.NONE,
  );
  const [chicksDepositStatusCode, setChicksDepositStatusCode] = useState(
    TokenStatusCode.NONE,
  );
  const [nftStatusCode, setNftStatusCode] = useState<NftStatus>(NftStatus.NONE);
  const [nftErrorCode, setNftErrorCode] = useState<NftErrorCode>(
    NftErrorCode.NO_ERROR,
  );
  const [chicksDepositErrorCode, setChicksDepositErrorCode] =
    useState<TokenErrorCode>(TokenErrorCode.NO_ERROR);
  const [shardsDepositErrorCode, setShardsDepositErrorCode] =
    useState<TokenErrorCode>(TokenErrorCode.NO_ERROR);

  return createNftExchangeStatus(
    selectedNft,
    selectedNfts,
    shardsDeposit,
    chicksDeposit,
    shardsDepositStatusCode,
    chicksDepositStatusCode,
    chicksDepositErrorCode,
    shardsDepositErrorCode,
    nftStatusCode,
    nftErrorCode,
  );
}

export default useNftExchange;
