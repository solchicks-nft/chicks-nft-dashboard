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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-proximanovabold text-center">
            Mystery Egg Airdrop
          </h1>
          <div className="mb-6 mt-12 text-md text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanovaregular text-center">
            <p className="font-medium">
              It was a hot and dry day on Planet Mellow, water was scarce and
              the heat was creating its first victims in the northern side of
              the village.
            </p>
            <br />
            <p className="font-medium">
              It had been only a few weeks since the peaceful Chicks were forced
              to walk through the portal out of Planet Chicco. Everyone was
              really worried and wondering if they could ever go back to their
              beloved and happy planet they still call home.
            </p>
            <br />
            <p className="font-medium">
              One night, two brothers were on their way back home but a powerful
              light caught their attention. It was the most vibrant light they’d
              ever seen and it drew them in its direction similar to how
              mermaids have a magnetic pull on sailors.
            </p>
            <br />
            <p className="font-medium">
              As they got closer to the light the intensity got stronger and
              stronger to the point where they could barely see. But after a
              while they started to see a shape and realized that before them
              there was an Egg. A magic egg? Why was it irradiating such a
              powerful light and how? That was a mystery...
            </p>
            <br />
            <p className="font-medium">
              Then they remembered an ancient legend the Elders always liked
              telling, saying that only a lucky person could get his hands on
              the Mystery Egg.. yes but who is this person?
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
              <div className="pt-10 w-full flex justify-center font-proximanovaregular text-lg font-medium">
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
