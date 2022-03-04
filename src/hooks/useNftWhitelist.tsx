import { useCallback, useEffect, useState } from 'react';
import { INftWhiteList } from '@/utils/nftConsts';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';

const createNftWhiteList = (whitelistAddress: INftWhiteList | undefined) => ({
  whitelistAddress,
});

function useNftWhiteList() {
  const wallet = useSolanaWallet();
  const [whitelistAddress, setWhitelistAddress] = useState<INftWhiteList>();

  const fetchWhitelistAddressData = useCallback(async () => {
    if (wallet.publicKey) {
      const responseData = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/airdrop_whitelist?id=${wallet.publicKey?.toBase58()}`,
      );
      const jsonData = await responseData.json();
      setWhitelistAddress(jsonData.data[0]);
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    if (!wallet.publicKey) {
      return;
    }
    fetchWhitelistAddressData().then();
  }, [fetchWhitelistAddressData, wallet.publicKey]);

  return createNftWhiteList(whitelistAddress);
}

export default useNftWhiteList;
