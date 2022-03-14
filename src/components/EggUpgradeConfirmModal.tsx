import * as React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import RightArrowIcon from '@/components/RightArrowIcon';
import { useNftExchange } from '@/contexts/NftExchangeContext';
import { Oval } from 'react-loader-spinner';
import { NftStatusCode } from '@/utils/nftConsts';
import NftStatusMessage from '@/components/NftStatusMessage';
import TargetEggUpgradeImage from '@/components/TargetEggUpgradeImage';

type EggUpgradeConfirmModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EggUpgradeConfirmModal = ({
  isOpen,
  setIsOpen,
}: EggUpgradeConfirmModalProps) => {
  const {
    selectedNft,
    setSelectedNft,
    exchange2dNftForEgg,
    nftIsProcessing,
    setNftIsProcessing,
    nftStatusCode,
    setNftStatusCode,
  } = useNftExchange();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          if (
            !nftIsProcessing ||
            nftStatusCode == NftStatusCode.SUCCESS ||
            nftStatusCode == NftStatusCode.FAILED
          ) {
            setSelectedNft(null);
            setIsOpen(false);
            setNftStatusCode(NftStatusCode.NONE);
            setNftIsProcessing(false);
          }
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
                {selectedNft && nftIsProcessing && (
                  <div>
                    <div className="py-6 w-full flex items-center justify-center">
                      <div>
                        <Oval
                          color="#5850EC"
                          secondaryColor="#FFFFF"
                          height={80}
                          width={80}
                        />
                      </div>
                    </div>
                    <NftStatusMessage nftStatusCode={nftStatusCode} />
                  </div>
                )}
                {selectedNft &&
                  !nftIsProcessing &&
                  nftStatusCode === NftStatusCode.SUCCESS && (
                    <div className="w-full flex">
                      <p className="text-xl text-gray-500 font-proximanovaregular mt-6">
                        Your NFT exchange is complete.
                      </p>
                    </div>
                  )}
                {selectedNft &&
                  !nftIsProcessing &&
                  nftStatusCode === NftStatusCode.NONE && (
                    <div>
                      <div className="py-6 w-full flex items-center justify-center">
                        <div>
                          <img
                            src={selectedNft.data.metadata.data.image}
                            alt={selectedNft.data.metadata.data.description}
                            className="h-48 rounded-xl"
                          />
                        </div>
                        <div className="px-4">
                          <RightArrowIcon />
                        </div>
                        <TargetEggUpgradeImage selectedNft={selectedNft} />
                      </div>
                      <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
                        Please confirm that you want to exchange your NFT for a
                        limited edition 3D egg.
                      </p>
                    </div>
                  )}
                {!selectedNft ||
                  (selectedNft && nftStatusCode === NftStatusCode.FAILED && (
                    <div>
                      <p className="text-xl text-gray-500 font-proximanovaregular mt-2 text-center">
                        An error has occurred, please try again.
                      </p>
                    </div>
                  ))}
                {!selectedNft && (
                  <div>
                    <p className="text-xl text-gray-500 font-proximanovaregular mt-2 text-center">
                      An error has occurred, please try again.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                {selectedNft &&
                  !nftIsProcessing &&
                  nftStatusCode === NftStatusCode.NONE && (
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mr-3 font-proximanovabold"
                        onClick={() => exchange2dNftForEgg()}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-gray-500 hover:bg-gray-600 md:py-4 md:text-lg md:px-10 font-proximanovabold"
                        onClick={() => {
                          setIsOpen(false);
                          setNftStatusCode(NftStatusCode.NONE);
                        }}
                      >
                        No
                      </button>
                    </div>
                  )}
                {(selectedNft && nftIsProcessing) ||
                  (selectedNft && nftStatusCode === NftStatusCode.SUCCESS && (
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mr-3 font-proximanovabold"
                        onClick={() => {
                          setIsOpen(false);
                          setNftStatusCode(NftStatusCode.NONE);
                        }}
                      >
                        Ok
                      </button>
                    </div>
                  ))}
                {!selectedNft && (
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 justify-center px-8 py-3 border border-transparent text-base
                              font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mr-3 font-proximanovabold"
                      onClick={() => {
                        setIsOpen(false);
                        setNftStatusCode(NftStatusCode.NONE);
                      }}
                    >
                      Ok
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
