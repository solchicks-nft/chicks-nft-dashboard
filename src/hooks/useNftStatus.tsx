import { useEffect, useState } from 'react';
import SampleNfts from '@/assets/data/sample-nfts.json';
import { INft } from '@/utils/nftConsts';
import { useWallet } from '@solana/wallet-adapter-react';

const createNftStatus = (nfts: INft[] | undefined) => ({
  nfts,
});

function useNftStatus() {
  const { publicKey: solanaAddress } = useWallet();
  const [nfts, setNfts] = useState<INft[]>();

  useEffect(() => {
    async function fetchData() {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT != `staging`) {
        const respData = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet?id=${solanaAddress}`,
        );
        const jsonData = await respData.json();
        setNfts(jsonData.data);
      } else {
        setNfts(SampleNfts as unknown as INft[]);
      }
    }
    if (solanaAddress) fetchData().then();
  }, [solanaAddress]);

  return createNftStatus(nfts);
}

export default useNftStatus;
