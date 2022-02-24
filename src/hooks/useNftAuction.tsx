import { INftBid } from '@/utils/nftConsts';
import { useState } from 'react';

const createNftAuctionStatus = (
  bidNft: INftBid | undefined,
  bidUserAddress: string | undefined,
  bidAmount: number,
) => ({
  bidNft,
  bidUserAddress,
  bidAmount,
});

interface INftAuction {
  bidNft: INftBid | undefined;
  bidUserAddress: string | undefined;
  bidAmount: number;
}

function useNftAuction(): INftAuction {
  const [bidNft, setBidNftHash] = useState<INftBid | undefined>();
  const [bidUserAddress, setBidUserAddress] = useState<string | undefined>();
  const [bidAmount, setBidAmount] = useState<number>(0);

  return createNftAuctionStatus(bidNft, bidUserAddress, bidAmount);
}
