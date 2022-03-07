import { useCallback, useEffect, useState } from 'react';
import { INftWhitelist } from '@/utils/nftConsts';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';

const createNftWhiteList = (nftWhitelist: INftWhitelist | undefined) => ({
  nftWhitelist: nftWhitelist,
});

function useNftWhiteList() {
  const wallet = useSolanaWallet();
  const [nftWhitelist, setNftWhitelist] = useState<INftWhitelist>();
  useState<INftWhitelist>();

  const fetchWhitelistAddressData = useCallback(async () => {
    if (wallet.publicKey) {
      const responseData = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/airdrop_whitelist?id=${wallet.publicKey?.toBase58()}`,
      );
      const jsonData = await responseData.json();
      setNftWhitelist(jsonData.data[0]);
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    if (!wallet.publicKey) {
      return;
    }
    fetchWhitelistAddressData().then();
  }, [fetchWhitelistAddressData, wallet.publicKey]);

  return createNftWhiteList(nftWhitelist);
}

export default useNftWhiteList;
