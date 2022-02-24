import { useEffect, useState } from 'react';
import SampleNftBid from '@/assets/data/sample-nft-bid.json';
import { INftBid } from '@/utils/nftConsts';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';

const createNftAuction = (nftBid: INftBid | undefined) => ({
  nftBid,
});

function useNftAction() {
  const wallet = useSolanaWallet();
  const [nftBid, setNftBid] = useState<INftBid>();

  useEffect(() => {
    async function fetchData() {
      setNftBid(SampleNftBid as unknown as INftBid);
    }
    if (wallet) fetchData().then();
  }, [wallet]);

  return createNftAuction(nftBid);
}

export default useNftAction;
