import * as React from 'react';
import DiceIcon from '@/components/DiceIcon';
import useNftWhiteList from '@/hooks/useNftWhitelist';
import Layout from '@/components/Layout';

export default function Index() {
  const { nftWhitelist } = useNftWhiteList();
  const GLEAM_WHITELIST_URL = `https://gleam.io/eOSJj/100k-airdrop-campaign-to-win-3d-nft-egg`;

  return (
    <div>
      <Layout>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-12 bg-white">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-proximanovabold">
            Claim
          </h1>
          <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanovaregular">
            <p className="font-medium">
              Enter our whitelist raffle for your chance to win one of our
              limited edition NFTs.
            </p>
          </div>
          <div className="pt-6 w-full flex justify-center">
            <img
              src={`../img/wave1_common.jpg`}
              alt="egg"
              className="h-96 rounded-xl"
            />
          </div>
          {nftWhitelist && (
            <div>
              <div className="pt-10 w-full flex justify-center font-proximanovaregular text-lg">
                Congratulations, your address is eligible for our whitelist
                raffle!
              </div>
              <div className="pt-9 w-full flex justify-center">
                <button
                  className="items-center justify-center px-6 py-3 border border-transparent
                                    text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    md:py-4 md:text-lg md:px-6 font-proximanovabold mr-3 flex"
                  onClick={() =>
                    window.open(
                      `${GLEAM_WHITELIST_URL}?Address=${nftWhitelist?.owner}&Hash=${nftWhitelist?.hash}`,
                      `_blank`,
                    )
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
          {!nftWhitelist && (
            <div className="pt-10 w-full flex justify-center font-proximanovaregular text-lg">
              Sorry, your address is not eligible for our whitelist raffle.
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}
