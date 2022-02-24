import { useEffect, useState } from 'react';
import SampleNfts from '@/assets/data/sample-nfts.json';
import { INft } from '@/utils/nftConsts';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';

const createNftStatus = (nfts: INft[] | undefined) => ({
  nfts,
});

function useNftStatus() {
  const wallet = useSolanaWallet();
  const [nfts, setNfts] = useState<INft[]>();

  useEffect(() => {
    async function fetchData() {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT != `staging`) {
        const respData = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/wallet?id=${wallet.publicKey?.toBase58()}`,
        );
        const jsonData = await respData.json();
        setNfts(jsonData.data);
      } else {
        setNfts(SampleNfts as unknown as INft[]);
      }
    }
    if (wallet) fetchData().then();
  }, [wallet]);

  return createNftStatus(nfts);
}

export default useNftStatus;
