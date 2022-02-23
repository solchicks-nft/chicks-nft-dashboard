import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWalletAlert() {
  return (
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
  );
}