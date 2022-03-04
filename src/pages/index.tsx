import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DiceIcon from '@/components/DiceIcon';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import useNftWhiteList from '@/hooks/useNftWhitelist';

export default function Index() {
  const wallet = useSolanaWallet();
  const [mobile, setMobile] = useState();
  const { whitelistAddress } = useNftWhiteList();
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
          {!wallet.connected && <ConnectWalletAlert />}
          {wallet.connected && (
            <div className="bg-cover bg-gray-100 min-h-screen">
              <Navbar />
              <main>
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-12 bg-white">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-proximanovabold">
                    Claim
                  </h1>
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanovaregular">
                    <p className="font-medium">
                      Enter our whitelist raffle for your chance to win one of
                      our limited edition 3D NFT eggs.
                    </p>
                  </div>
                  <div className="pt-6 w-full flex justify-center">
                    <img
                      src={`../img/wave1_common.jpg`}
                      alt="egg"
                      className="h-96 rounded-xl"
                    />
                  </div>
                  {whitelistAddress && (
                    <div>
                      <div className="pt-10 w-full flex justify-center font-proximanovaregular text-lg">
                        Congratulations, your address is eligible for our
                        whitelist raffle 🎉
                      </div>
                      <div className="pt-7 w-full flex justify-center">
                        <button
                          className="items-center justify-center px-6 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    md:py-4 md:text-lg md:px-6 font-proximanovabold mr-3 flex"
                          onClick={() =>
                            window.open(GLEAM_WHITELIST_URL, `_blank`)
                          }
                        >
                          <div className="pr-5">
                            <DiceIcon />
                          </div>
                          I&#39;m Feeling Lucky
                        </button>
                      </div>
                    </div>
                  )}
                  {!whitelistAddress && (
                    <div className="pt-10 w-full flex justify-center font-proximanovaregular text-lg">
                      Sorry, your address is not eligible for our whitelist
                      raffle.
                    </div>
                  )}
                </div>
              </main>
              <Footer />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
