import { SolanaWalletProvider } from '@/contexts/SolanaWalletProvider';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { NftExchangeProvider } from '@/contexts/NftExchangeContext';

require(`@/styles/globals.css`);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaWalletProvider>
      <NftExchangeProvider>
        <Component {...pageProps} />
      </NftExchangeProvider>
    </SolanaWalletProvider>
  );
};

export default App;
