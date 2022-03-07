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
                  <div className="mb-4 mt-4 text-xl text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-proximanovaregular">
                    <span className="font-medium">
                      Find all the answers to commonly asked questions.
                    </span>
                    <div className="font-proximanovaregular mt-12">
                      <div className="mb-12">
                        <p className="font-proximanovabold">
                          How can I know if I am eligible to win a 3D egg NFT?
                        </p>
                        <p className="font-proximanovaregular text-base">
                          Between March 1 to 9th, we will be airdropping 1
                          $CHICKS token to 75,000 non-$CHICKS holders. To check
                          if you&#039;re eligible, just connect your wallet
                          address and click on the{` `}
                          <strong>I&#039;m Feeling Lucky</strong> button.
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
