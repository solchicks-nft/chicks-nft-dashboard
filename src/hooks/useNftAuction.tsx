import {
  INft,
  NftErrorCode,
  NftStatus,
  TokenErrorCode,
  TokenStatusCode,
} from '@/utils/nftConsts';
import { useState } from 'react';

const createNftAuctionStatus = (selectedNft: INft | undefined) => ({
  selectedNft,
});

interface INftAuction {
  selectedNft: INft | undefined;
}

function useNftAuction(): INftAuction {
  const [selectedNft, setSelectedNft] = useState<INft | undefined>();

  return createNftAuctionStatus(selectedNft);
}
