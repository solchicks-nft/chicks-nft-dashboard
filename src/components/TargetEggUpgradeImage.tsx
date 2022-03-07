import * as React from 'react';
import { getTargetUpgradeWave, INft, NftRarityEnum } from '@/utils/nftConsts';

type TargetEggUpgradeImageProps = {
  selectedNft: INft;
};

export default function TargetEggUpgradeImage({
  selectedNft,
}: TargetEggUpgradeImageProps) {
  function getTargetUpgradeRarity(nft: INft, rarity: NftRarityEnum) {
    if (
      nft.data.metadata.data.attributes.filter((o) => o.value == rarity)
        .length > 0
    ) {
      return rarity.toLowerCase();
    }
  }

  function getTargetUpgradeImage(nft: INft) {
    let rarity;
    const wave = getTargetUpgradeWave(
      nft.data.metadata.data.name as unknown as number,
    );

    rarity = getTargetUpgradeRarity(nft, NftRarityEnum.COMMON);
    if (rarity == null) {
      rarity = getTargetUpgradeRarity(nft, NftRarityEnum.LEGENDARY);
    }
    if (rarity == null) {
      rarity = getTargetUpgradeRarity(nft, NftRarityEnum.MYTHICAL);
    }
    if (rarity == null) {
      rarity = getTargetUpgradeRarity(nft, NftRarityEnum.RARE);
    }
    if (rarity == null) {
      rarity = getTargetUpgradeRarity(nft, NftRarityEnum.UNCOMMON);
    }

    return wave != null && rarity != null
      ? `${wave}_${rarity}.jpg`
      : `wave1_common.jpg`;
  }

  return (
    <div>
      <img
        src={`../img/${getTargetUpgradeImage(selectedNft)}`}
        alt={`${getTargetUpgradeImage(selectedNft)}`}
        className="h-48 rounded-xl"
      />
    </div>
  );
}
