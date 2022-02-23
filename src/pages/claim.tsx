import { useWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EggClaimConfirmModal } from '@/components/EggClaimConfirmModal';

export default function Claim() {
  const { publicKey: solanaAddress } = useWallet();
  const [mobile, setMobile] = useState();
  const [isEggClaimDialogOpen, setEggClaimDialogOpen] = useState(false);
  const GLEAM_WHITELIST_URL = `https://gleam.io/`;

  useEffect(() => {
    setMobile(isMobile as unknown as SetStateAction<undefined>);
  }, [setMobile]);

  return (
    <div>
      {mobile ? (
        <MobileViewAlert />
      ) : (
        <div>
          {!solanaAddress && <ConnectWalletAlert />}
          {solanaAddress && (
            <div className="bg-cover bg-gray-100 min-h-screen">
              <Navbar />
              <main>
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-12 bg-white">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-proximanovabold">
                    Claim
                  </h1>
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanova">
                    <p className="font-medium">
                      Here is your chance to win one of our limited edition 3D
                      NFT eggs. Take your pick 😉
                    </p>
                  </div>
                  <div className="pt-6 w-full flex justify-center">
                    <img
                      src={`../img/sample_egg.png`}
                      alt="egg"
                      className="h-96 rounded-xl"
                    />
                  </div>
                  <div className="pt-6 w-full flex justify-center">
                    <button
                      className="items-center justify-center px-8 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    md:py-4 md:text-lg md:px-10 font-proximanovabold mr-3"
                      onClick={() => {
                        setEggClaimDialogOpen(!isEggClaimDialogOpen);
                      }}
                    >
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I'm Feeling Lucky
                    </button>
                    <button
                      className="items-center justify-center px-8 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    md:py-4 md:text-lg md:px-10 font-proximanovabold"
                      onClick={() => window.open(GLEAM_WHITELIST_URL, `_blank`)}
                    >
                      Challenge Me
                    </button>
                  </div>
                </div>
              </main>
              <EggClaimConfirmModal
                isOpen={isEggClaimDialogOpen}
                setIsOpen={setEggClaimDialogOpen}
                walletAddress={solanaAddress.toString()}
              />
              <Footer />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
