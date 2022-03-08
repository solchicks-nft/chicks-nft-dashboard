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
                  t was a hot and dry day on Planet Mellow, water was scarce in
                  this place they now called home and the heat was taking its
                  toll on the village. One night, two brothers were on their way
                  back home but a powerful light caught their attention. It was
                  the most vibrant light they’d ever seen and it drew them in
                  its direction similar to how mermaids have a magnetic pull on
                  sailors.
                </span>
              </p>
              <br />
              <p className="font-icielstabile text-xl">
                As they got closer to the light the intensity grew stronger and
                stronger to the point where they could barely see. After a while
                their eyes adapted, they started to see a shape and realized
                that before them there was a mysterious egg. Why was it
                irradiating such a powerful light and what was in it?
              </p>
              <br />
              <p className="font-icielstabile text-xl">
                They pondered this for a while. They remembered an ancient
                legend the Elders always liked telling, saying that only one
                lucky person could get his hands on the Mystery Egg…who will
                this lucky person be?
              </p>
              <br />
              <p className="font-icielstabile text-xl pb-8">
                Then they remembered an ancient legend the Elders always liked
                telling, saying that only a lucky person could get his hands on
                the Mystery Egg... yes but who is this person?
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
