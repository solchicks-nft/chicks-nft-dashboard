import { useWallet } from '@solana/wallet-adapter-react';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { INft } from '@/utils/nftConsts';
import { ClockIcon, SparklesIcon } from '@heroicons/react/solid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EggBreedingConfirmModal } from '@/components/EggBreedingConfirmModal';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import { HeartIcon } from '@/components/HeartIcon';
import useNft from '@/hooks/useNft';

export default function Index() {
  const { publicKey: solanaAddress } = useWallet();
  const [mobile, setMobile] = useState();
  const [isEggBreedingConfirmDialogOpen, setEggBreedingConfirmModal] =
    useState(false);
  const { nfts } = useNft();
  const [selectedNfts, setSelectedNfts] = useState<INft[]>([]);

  useEffect(() => {
    setMobile(isMobile as unknown as SetStateAction<undefined>);
  }, [setMobile]);

  function isEggBreedingAvailable(nft: INft) {
    const nftValues = nft.data.metadata.data.attributes.filter(
      (o) => o.value != `egg` && o.value == `hatched`,
    );
    return nft.days_in_wallet >= 60 && nftValues.length > 0;
  }

  return (
    <div>
      {mobile ? (
        <MobileViewAlert />
      ) : (
        <div>
          {!solanaAddress && <ConnectWalletAlert />}
          {solanaAddress && (
            <div className="min-h-screen bg-cover bg-gray-100">
              <Navbar />
              <main>
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-12 bg-white">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-proximanovabold">
                    Breed
                  </h1>
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanova">
                    <span className="font-medium">
                      Please select two NFTs to breed.
                    </span>
                  </div>
                  {nfts && (
                    <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {nfts.map((nft) => (
                        <div
                          key={nft.hash}
                          className="bg-gray-50 p-6 rounded-lg"
                        >
                          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
                            <img
                              src={nft.data.metadata.data.image}
                              alt={nft.data.metadata.data.description}
                              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div className="font-bold text-xl pb-3 pt-2 font-proximanovabold">
                              {nft.data.metadata.data.symbol}
                              {` #`}
                              {nft.data.metadata.data.name}
                            </div>
                          </div>
                          <div className="flex text-sm py-1">
                            <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="font-proximanova">
                              {nft.days_in_wallet}
                              {` `}
                              {nft.days_in_wallet == 1 ? `day` : `days`} in
                              wallet
                            </span>
                          </div>
                          <div className="flex text-sm py-1">
                            <SparklesIcon className="h-5 w-5 text-blue-500 mr-2 " />
                            <span className="font-proximanova">
                              {isEggBreedingAvailable(nft)
                                ? `Breeding available`
                                : `Breeding unavailable`}
                            </span>
                          </div>
                          <div className="flex-auto mt-5">
                            <div className="rounded-md shadow">
                              <button
                                className={
                                  isEggBreedingAvailable(nft)
                                    ? `w-full flex items-center justify-center px-8 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    md:py-4 md:text-lg md:px-10 font-proximanovabold`
                                    : `w-full flex items-center justify-center px-8 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-gray-300 md:py-4 md:text-lg md:px-10
                                    font-proximanovabold`
                                }
                                disabled={!isEggBreedingAvailable(nft)}
                                onClick={() => {
                                  if (selectedNfts.length > 2) {
                                    setSelectedNfts([]);
                                  }
                                  const updatedSelectedNfts = [...selectedNfts];
                                  updatedSelectedNfts.push(nft);
                                  setSelectedNfts(updatedSelectedNfts);
                                }}
                              >
                                <div className="pr-3">
                                  <HeartIcon
                                    fill="#fff"
                                    height="32"
                                    width="32"
                                  />
                                </div>
                                {` `}
                                Select ({selectedNfts.length})
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!nfts ||
                    (nfts.length === 0 && (
                      <div className="font-proximanova">
                        We could not find any SolChicks NFTs in your wallet.
                      </div>
                    ))}
                </div>
                <Footer />
              </main>
              <EggBreedingConfirmModal
                isOpen={isEggBreedingConfirmDialogOpen}
                setIsOpen={setEggBreedingConfirmModal}
                selectedNfts={selectedNfts}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
