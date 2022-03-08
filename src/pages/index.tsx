import * as React from 'react';
import DiceIcon from '@/components/DiceIcon';
import useNftWhiteList from '@/hooks/useNftWhitelist';
import Layout from '@/components/Layout';

export default function Index() {
  const { nftWhitelist } = useNftWhiteList();
  const GLEAM_AIRDROP_WHITELIST_URL = `https://gleam.io/eOSJj/100k-airdrop-campaign-to-win-mystery-egg`;
  const GLEAM_NON_AIRDROP_WHITELIST_URL = `https://gleam.io/k7w5P/100k-airdrop-campaign-landing-page`;

  return (
    <div>
      <Layout>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-12 bg-white">
          <div className="mb-6 text-md text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <div className="lore-background">
              <h1 className="text-6xl font-bold tracking-tight text-gray-900 font-icielstabile text-center mb-12">
                Mystery Egg Airdrop
              </h1>
              <p className="font-icielstabile">
                <span className="lore-caps font-proximanovabold">I</span>
                <span className="text-xl">
                  t was a hot and dry night on Planet Mellow, where the
                  remaining SolChicks landed after escaping from their home
                  Planet Chicco which was destroyed by DarkFangs. Water was
                  scarce on the planet and the heat was taking its toll on them,
                  but the SolChicks troop had to continue their journey to find
                  fertile land to build their new base.
                </span>
              </p>
              <br />
              <p className="font-icielstabile text-xl">
                As they were searching through the dark forest, at a far
                distance, they saw a powerful light illuminating its
                surrounding. It was the most vibrant light they had ever seen on
                the planet, and it drew them to its direction.
              </p>
              <br />
              <p className="font-icielstabile text-xl">
                It was difficult to see clearly at first as the light was so
                powerful, but slowly they started to recognize the shape and
                realized that there was a mysterious egg in front of them.
              </p>
              <br />
              <p className="font-icielstabile text-xl">
                Why is it irradiating such a powerful light? What is in it?
              </p>
              <br />
              <p className="font-icielstabile text-xl pb-8">
                They pondered for a while, then remembered an ancient legend
                that Elder SolChick once told them, the legend that said only
                the chosen one would get his hands on the Mystery Egg.
              </p>
              <div className="pt-8 w-full flex justify-center">
                <img
                  src={`../img/claim_splash.jpg`}
                  alt="egg"
                  className="h-96 rounded-xl"
                />
              </div>
              <div>
                <div className="pt-10 w-full flex justify-center font-icielstabile text-2xl font-medium">
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
                        nftWhitelist
                          ? `${GLEAM_AIRDROP_WHITELIST_URL}?Address=${nftWhitelist?.owner}&Hash=${nftWhitelist?.hash}`
                          : `${GLEAM_NON_AIRDROP_WHITELIST_URL}`,
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
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
