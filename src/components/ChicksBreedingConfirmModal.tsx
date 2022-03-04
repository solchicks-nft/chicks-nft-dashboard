import * as React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HeartIcon } from '@/components/HeartIcon';
import { useNftExchange } from '@/contexts/NftExchangeContext';

type EggBreedingConfirmModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChicksBreedingConfirmModal = ({
  isOpen,
  setIsOpen,
}: EggBreedingConfirmModalProps) => {
  const { selectedNfts, setSelectedNfts } = useNftExchange();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setIsOpen(false);
          setSelectedNfts([]);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-9 my-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-gray-900 pb-2 font-proximanovabold"
              >
                Confirm
              </Dialog.Title>
              <div className="mt-2 mb-8">
                {selectedNfts && selectedNfts.length === 2 && (
                  <div className="py-6 w-full flex items-center justify-center">
                    <div>
                      <img
                        src={selectedNfts[0].data.metadata.data.image}
                        alt={selectedNfts[0].data.metadata.data.description}
                        className="h-48 rounded-xl"
                      />
                    </div>
                    <div className="px-4">
                      <HeartIcon fill="#ffcccb" height="80px" width="100px" />
                    </div>
                    <div>
                      <img
                        src={selectedNfts[1].data.metadata.data.image}
                        alt={selectedNfts[1].data.metadata.data.description}
                        className="h-48 rounded-xl"
                      />
                    </div>
                  </div>
                )}
                <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
                  Please confirm that you want to breed these two NFTs. It will
                  cost you 300 SHARDS and 300 CHICKS.
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mr-3 font-proximanovabold"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedNfts([]);
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-gray-500 hover:bg-gray-600 md:py-4 md:text-lg md:px-10 font-proximanovabold"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedNfts([]);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
