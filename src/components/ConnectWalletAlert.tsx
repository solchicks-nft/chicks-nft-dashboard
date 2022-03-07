import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWalletAlert() {
  return (
    <div className="flex flex-col h-screen splash-image bg-cover">
      <div className="flex flex-col my-auto mx-auto items-center">
        <WalletMultiButton
          className="p-10 border border-transparent shadow-sm text-sm
                        font-bold rounded-md text-[#D75212] bg-[#FFC41D] hover:bg-[#A13C2F] hover:text-white
                        font-icielstabile text-4xl"
        />
      </div>
    </div>
  );
}
