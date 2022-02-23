import { useWallet } from '@solana/wallet-adapter-react';
import { SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Help() {
  const { publicKey: solanaAddress } = useWallet();
  const [mobile, setMobile] = useState();

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
                    Help
                  </h1>
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanova">
                    <span className="font-medium">
                      Find all the answers to commonly asked questions.
                    </span>
                    <div className="font-proximanova mt-12">
                      <div className="mb-6">
                        <p className="font-proximanovabold">
                          How can I exchange my NFT for a new 3D one?
                        </p>
                        <p className="font-proximanova">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec ornare aliquam nulla. Quisque pretium
                          purus id justo posuere, nec interdum libero finibus.
                          Proin feugiat mi et auctor volutpat. Ut eget mauris
                          arcu. Maecenas vel lacinia nisi, id imperdiet purus.
                        </p>
                      </div>
                      <div className="mb-9">
                        <p className="font-proximanovabold">
                          How can I exchange my NFT for a new 3D one?
                        </p>
                        <p className="font-proximanova">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec ornare aliquam nulla. Quisque pretium
                          purus id justo posuere, nec interdum libero finibus.
                          Proin feugiat mi et auctor volutpat. Ut eget mauris
                          arcu. Maecenas vel lacinia nisi, id imperdiet purus.
                        </p>
                      </div>
                      <div className="mb-9">
                        <p className="font-proximanovabold">
                          How can I exchange my NFT for a new 3D one?
                        </p>
                        <p className="font-proximanova">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec ornare aliquam nulla. Quisque pretium
                          purus id justo posuere, nec interdum libero finibus.
                          Proin feugiat mi et auctor volutpat. Ut eget mauris
                          arcu. Maecenas vel lacinia nisi, id imperdiet purus.
                        </p>
                      </div>
                      <div className="mb-9">
                        <p className="font-proximanovabold">
                          How can I exchange my NFT for a new 3D one?
                        </p>
                        <p className="font-proximanova">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec ornare aliquam nulla. Quisque pretium
                          purus id justo posuere, nec interdum libero finibus.
                          Proin feugiat mi et auctor volutpat. Ut eget mauris
                          arcu. Maecenas vel lacinia nisi, id imperdiet purus.
                        </p>
                      </div>
                      <div className="mb-9">
                        <p className="font-proximanovabold">
                          How can I exchange my NFT for a new 3D one?
                        </p>
                        <p className="font-proximanova">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec ornare aliquam nulla. Quisque pretium
                          purus id justo posuere, nec interdum libero finibus.
                          Proin feugiat mi et auctor volutpat. Ut eget mauris
                          arcu. Maecenas vel lacinia nisi, id imperdiet purus.
                        </p>
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
