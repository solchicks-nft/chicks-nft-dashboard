import { SolanaWalletProvider } from '@/contexts/SolanaWalletProvider';
import { AppProps } from 'next/app';
import { FC } from 'react';

require(`@/styles/globals.css`);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SolanaWalletProvider>
      <Component {...pageProps} />
    </SolanaWalletProvider>
  );
};

export default App;
