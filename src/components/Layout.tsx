import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import * as React from 'react';
import {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import MobileViewAlert from '@/components/MobileViewAlert';
import ConnectWalletAlert from '@/components/ConnectWalletAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import seo from '@/data/seo';

export default function Layout({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) {
  const wallet = useSolanaWallet();
  const [mobile, setMobile] = useState();

  useEffect(() => {
    setMobile(isMobile as unknown as SetStateAction<undefined>);
  }, [setMobile]);

  return (
    <div>
      <Head>
        <title>{seo.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="canonical" href={seo.siteUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={seo.ogSiteName} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={seo.ogUrl} />
        <meta property="og:image" content={seo.ogImageUrl} />
        <meta property="og:image:secure_url" content={seo.ogImageSecureUrl} />
        <meta property="og:image:width" content={seo.ogImageWidth} />
        <meta property="og:image:height" content={seo.ogImageHeight} />
        <meta property="twitter:card" content={seo.twitterCard} />
        <meta property="twitter:site" content={seo.twitterSite} />
        <meta property="twitter:domain" content={seo.twitterDomain} />
        <meta property="twitter:title" content={seo.twitterTitle} />
        <meta property="twitter:description" content={seo.twitterDescription} />
        <meta property="twitter:creator" content={seo.twitterCreator} />
        <meta property="twitter:image" content={seo.twitterImage} />
        <link rel="icon" href={seo.linkIcon32x32} sizes="32x32" />
        <link rel="icon" href={seo.linkIcon192x192} sizes="192x192" />
        <link rel="apple-touch-icon" href={seo.linkIconAppleTouchIcon} />
      </Head>
      <div>
        {mobile ? (
          <MobileViewAlert />
        ) : (
          <div>
            {!wallet.connected && <ConnectWalletAlert />}
            {wallet.connected && (
              <div className="bg-cover bg-gray-100 min-h-screen">
                <Navbar />
                <main>{children}</main>
                <Footer />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
