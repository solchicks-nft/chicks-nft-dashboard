import * as React from 'react';
import { NftStatusCode } from '@/utils/nftConsts';

type NftStatusMessageProps = {
  nftStatusCode: NftStatusCode;
};

export default function NftStatusMessage({
  nftStatusCode,
}: NftStatusMessageProps) {
  return (
    <div>
      {nftStatusCode === NftStatusCode.NONE && (
        <div>
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Please confirm that you want to exchange your NFT for a limited
            edition 3D egg.
          </p>
        </div>
      )}
      {nftStatusCode === NftStatusCode.START && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Your NFT exchange has started...
          </p>
        </div>
      )}
      {nftStatusCode === NftStatusCode.CHECKING && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Checking if NFT is eligible for an exchange...
          </p>
        </div>
      )}
      {nftStatusCode === NftStatusCode.TRANSFERRING && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Transferring NFT to our smart contract...
          </p>
        </div>
      )}
      {nftStatusCode === NftStatusCode.PREPARING && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Preparing NFT...
          </p>
        </div>
      )}
      {nftStatusCode === NftStatusCode.SUCCESS && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-gray-500 font-proximanovaregular mt-2">
            Your NFT exchange has been successful!
          </p>
        </div>
      )}
    </div>
  );
}
