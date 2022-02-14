import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import ChicksLogo from '@/components/ChicksLogo';
import SampleNft from '../assets/sample-nft.json';
import ConsoleHelper from '@/utils/consoleHelper';

export default function Index() {
  const { publicKey: solanaAddress } = useWallet();
  const [mobile, setMobile] = useState();

  const handleExchangeButtonClick = () => {
    ConsoleHelper(`handleExchangeButtonClick`);
  };

  useEffect(() => {
    setMobile(isMobile as unknown as SetStateAction<undefined>);
  }, [setMobile]);

  return (
    <div>
      {mobile ? (
        <div className="flex flex-col h-screen bg-[url('/background.jpg')] bg-cover">
          <div className="flex flex-col my-auto mx-auto items-center p-6 text-center text-white font-bold">
            Please open this website in your desktop browser, mobile is
            currently unsupported.
          </div>
        </div>
      ) : (
        <div>
          {!solanaAddress && (
            <div className="flex flex-col h-screen bg-[url('/background.jpg')] bg-cover">
              <div className="flex flex-col my-auto mx-auto items-center">
                <p className="font-icielstabile text-xl md:text-6xl antialiased text-white drop-shadow-xl mb-6">
                  Please connect your wallet
                </p>
                <WalletMultiButton
                  className="py-2 px-4 border border-transparent shadow-sm text-sm
                        font-bold rounded-md text-[#D75212] bg-[#FFC41D] hover:bg-[#A13C2F] hover:text-white
                        font-icielstabile text-2xl"
                />
              </div>
            </div>
          )}
          {solanaAddress && (
            <div>
              <div className="bg-indigo-900">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-lg">
                        <ChicksLogo />
                      </span>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-3 sm:mt-0 sm:w-auto">
                      <WalletMultiButton
                        className="py-2 px-4 border border-transparent shadow-sm text-sm
                        font-bold rounded-md text-[#D75212] bg-[#FFC41D] hover:bg-[#A13C2F] hover:text-white
                        font-icielstabile text-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-5 gap-6">
                      <div className="col-span-3">
                        <p className="text-3xl text-gray-900 font-bold">
                          {SampleNft.metadata.data.collection.name} -{` `}
                          {SampleNft.metadata.data.name}
                        </p>
                        <h3 className="pt-6 font-bold">Description</h3>
                        <div className="pb-6 pt-6">
                          <p className="text-base text-gray-900">
                            {SampleNft.metadata.data.description}
                          </p>
                        </div>
                        <h3 className="font-bold">Attributes</h3>
                        <div className="mt-4">
                          <ul
                            role="list"
                            className="pl-4 list-disc text-sm space-y-2"
                          >
                            {SampleNft.metadata.data.attributes.map(
                              (attribute) => (
                                <li
                                  key={attribute.trait_type}
                                  className="text-gray-400"
                                >
                                  <span className="text-gray-600">
                                    {attribute.value}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                          <div className="mt-8">
                            <h3 className="font-bold pb-3">
                              Claim Eligibility
                            </h3>
                            <span className="font-medium">
                              You have owned this NFT for 1233 days and it is
                              eligible for an exchange.
                            </span>
                            <button
                              type="submit"
                              className="mt-6 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex
                          items-center justify-center text-base font-bold text-white hover:bg-indigo-300
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={handleExchangeButtonClick}
                            >
                              Exchange
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <img
                          src={SampleNft.metadata.data.image}
                          alt={SampleNft.metadata.data.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
