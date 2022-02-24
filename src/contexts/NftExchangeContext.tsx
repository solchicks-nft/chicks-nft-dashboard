import {
  INft,
  NftErrorCode,
  NftStatus,
  TokenErrorCode,
  TokenStatusCode,
} from '@/utils/nftConsts';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';

interface INftExchange {
  selectedNft: INft | null | undefined;
  setSelectedNft: (nft: INft | null | undefined) => void;
  selectedNfts: INft[];
  setSelectedNfts(nfts: INft[]): void;
  shardsDeposit: number;
  chicksDeposit: number;
  shardsDepositStatusCode: TokenStatusCode;
  chicksDepositStatusCode: TokenStatusCode;
  chicksDepositErrorCode: TokenErrorCode;
  shardsDepositErrorCode: TokenErrorCode;
  nftStatusCode: NftStatus;
  nftErrorCode: NftErrorCode;
}

const NftExchangeContext = React.createContext<INftExchange>({
  selectedNft: undefined,
  setSelectedNft: () => undefined,
  selectedNfts: [],
  setSelectedNfts: () => undefined,
  shardsDeposit: 0,
  chicksDeposit: 0,
  shardsDepositStatusCode: TokenStatusCode.NONE,
  chicksDepositStatusCode: TokenStatusCode.NONE,
  chicksDepositErrorCode: TokenErrorCode.NO_ERROR,
  shardsDepositErrorCode: TokenErrorCode.NO_ERROR,
  nftStatusCode: NftStatus.NONE,
  nftErrorCode: NftErrorCode.NO_ERROR,
});
export const NftExchangeProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [selectedNft, setSelectedNft] = useState<INft | null | undefined>();
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

  const contextValue = useMemo(
    () => ({
      selectedNft,
      setSelectedNft,
      selectedNfts,
      setSelectedNfts,
      shardsDeposit,
      chicksDeposit,
      shardsDepositStatusCode,
      chicksDepositStatusCode,
      chicksDepositErrorCode,
      shardsDepositErrorCode,
      nftStatusCode,
      nftErrorCode,
    }),
    [
      selectedNft,
      setSelectedNft,
      selectedNfts,
      setSelectedNfts,
      shardsDeposit,
      chicksDeposit,
      shardsDepositStatusCode,
      chicksDepositStatusCode,
      chicksDepositErrorCode,
      shardsDepositErrorCode,
      nftStatusCode,
      nftErrorCode,
    ],
  );

  return (
    <NftExchangeContext.Provider value={contextValue}>
      {children}
    </NftExchangeContext.Provider>
  );
};

export const useNftExchange = () => useContext(NftExchangeContext);
