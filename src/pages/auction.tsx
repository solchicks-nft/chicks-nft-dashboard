import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChicksLogo } from '@/components/ChicksLogo';
import Countdown from 'react-countdown';
import useNftAction from '@/hooks/useNftAuction';

export default function Action() {
  const wallet = useSolanaWallet();
  const [mobile, setMobile] = useState();
  const { nftBid } = useNftAction();
  const [nftBidAmount, setNftBidAmount] = useState(0);

  useEffect(() => {
    setMobile(isMobile as unknown as SetStateAction<undefined>);
  }, [setMobile]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    if (completed) {
      return <span>Bid Closed</span>;
    }
    return (
      <span>
        {hours}h:{minutes}m:{seconds}s
      </span>
    );
  };

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
                    Auction
                  </h1>
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanovaregular">
                    <p className="font-medium">
                      Bid $CHICKS to win one of our limited edition 3D NFT eggs.
                    </p>
                  </div>
                  <div className="pt-6 w-full flex">
                    <div>
                      <img
                        src={nftBid?.image}
                        alt="egg"
                        className="h-96 rounded-xl"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="rounded-md lg:h-80 lg:aspect-none px-8 font-proximanovaregular flex">
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <div className="pr-12">
                              <div className="font-proximanovabold uppercase text-2xl text-gray-500">
                                Current Bid
                              </div>
                              <div className="flex flex-row pt-3">
                                <div className="flex flex-row pr-3">
                                  <ChicksLogo
                                    fill={`#C0C0C0`}
                                    height={`38`}
                                    width={`38`}
                                  />
                                </div>
                                <div className="font-proximanovaregular text-3xl text-gray-400">
                                  {nftBid?.highest_chicks_bid}
                                </div>
                              </div>
                            </div>
                            <div className="pr-12">
                              <span className="font-proximanovabold uppercase text-2xl text-gray-500">
                                Time Left
                              </span>
                              <div className="font-proximanovaregular text-3xl text-gray-400 pt-3">
                                <Countdown
                                  date={new Date().setHours(
                                    new Date().getHours() + 36,
                                  )}
                                  daysInHours
                                  renderer={renderer}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-96 mt-6">
                            <input
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              type="text"
                              className="rounded-md text-3xl"
                              value={nftBidAmount}
                              onChange={(e) =>
                                setNftBidAmount(
                                  e.target.value as unknown as number,
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-row pt-6">
                            <button
                              type="button"
                              disabled={nftBidAmount == 0 || !nftBidAmount}
                              className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mr-3 font-proximanovabold"
                            >
                              Place $CHICKS Bid
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
