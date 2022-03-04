export interface INftAttribute {
  value: string;
  trait_type: string;
}

export interface INftCollection {
  name: string;
  family: string;
}

export interface INftCreator {
  share: number;
  address: string;
}

export interface INftProperties {
  creators: INftCreator[];
}

export interface INftData {
  uri: string;
  name: string;
  image: string;
  symbol: string;
  attributes: INftAttribute[];
  collection: INftCollection;
  hashString: string;
  properties: INftProperties;
  description: string;
  rarityScore: number;
  external_url: string;
  animation_url: string;
  seller_fee_basis_points: number;
}

export interface INftMetadata {
  key: number;
  data: INftData;
  mint: string;
  type: string;
  isMutable: number;
  updateAuthority: string;
  primarySaleHappened: number;
}

export interface INftTokenInfo {
  name: string;
  type: string;
  supply: string;
  symbol: string;
  decimals: number;
  tokenAuthority: string;
}

export interface INftCreators {
  share: number;
  address: string;
  verified: number;
}

export interface INftChainData {
  uri: string;
  name: string;
  symbol: string;
  creators: INftCreators[];
  sellerFeeBasisPoints: number;
}

export interface INftChainMetadata {
  key: number;
  data: INftChainData;
  mint: string;
  type: string;
  isMutable: number;
  updateAuthority: string;
  primarySaleHappened: number;
}

export interface INftResponseData {
  type: string;
  account: string;
  lamports: number;
  metadata: INftMetadata;
  rentEpoch: number;
  tokenInfo: INftTokenInfo;
  ownerProgram: string;
  onchainMetadata: INftChainMetadata;
}

export interface INft {
  id: number;
  created_at: Date;
  hash: string;
  wallet_address: string;
  days_in_wallet: number;
  data: INftResponseData;
  updated_at: Date;
}

export enum NftStatusCode {
  NONE = 0,
  START,
  CHECKING,
  TRANSFERRING,
  PREPARING,
  SUCCESS,
  FAILED,
}

export enum NftErrorCode {
  NO_ERROR,
  CANT_CONNECT_SOLANA,
  NFT_AMOUNT_NOT_ENOUGH,
  TRANSFER_FAILED,
  SOLANA_NO_ASSOC_ACCOUNT,
  SERVER_INVALID,
  SUBMIT_FAILED,
}

export enum NftExchangeType {
  NONE,
  EGG,
  HATCH,
}

export enum TokenStatusCode {
  NONE = 0,
  START,
  TOKEN_AMOUNT_CHECKING,
  TRANSFERRING,
  SUBMITTING,
  SUCCESS,
  FAILED = 101,
}

export enum TokenErrorCode {
  NO_ERROR,
  CANT_CONNECT_SOLANA,
  TOKEN_AMOUNT_NOT_ENOUGH,
  TRANSFER_FAILED,
  SOLANA_NO_ASSOC_ACCOUNT,
  SERVER_INVALID,
  SUBMIT_FAILED,
}

export enum BidStatusCode {
  NONE = 0,
  START,
  BID_AMOUNT_CHECKING,
  TRANSFERRING,
  SUBMITTING,
  SUCCESS,
  FAILED = 101,
}

export interface INftBid {
  hash: string;
  image: string;
  reserve_chicks_bid: number;
  highest_chicks_bid: number;
  start_date: number;
  duration: number;
}

export interface INftWhiteList {
  owner: string;
  hash: string;
}
