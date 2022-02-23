import ChicksLogo from '@/components/ChicksLogo';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(` `);
}

export default function Navbar() {
  const router = useRouter();

  const navigation = [
    { name: `Exchange`, href: `/`, current: router.pathname == `/` },
    { name: `Claim`, href: `claim`, current: router.pathname == `/claim` },
    { name: `Breed`, href: `breed`, current: router.pathname == `/breed` },
    { name: `Help`, href: `help`, current: router.pathname == `/help` },
  ];

  return (
    <div className="bg-indigo-900">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg">
              <ChicksLogo />
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? `text-white font-bold` : `text-gray-300`,
                        `px-3 py-2 rounded-md text-md font-proximanovaregular hover:bg-indigo-800 hover:text-white`,
                      )}
                      aria-current={item.current ? `page` : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </span>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-3 sm:mt-0 sm:w-auto">
            <WalletMultiButton
              className="py-2 px-4 border border-transparent shadow-sm text-sm
                        font-bold rounded-md text-[#D75212] bg-[#FFC41D] hover:bg-[#A13C2F] hover:text-white
                        text-2xl font-proximanovaregular"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
