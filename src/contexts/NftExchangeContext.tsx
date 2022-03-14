import {
  INft,
  NftErrorCode,
  NftExchangeType,
  NftStatusCode,
  TokenErrorCode,
  TokenStatusCode,
} from '@/utils/nftConsts';
import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import { sleep } from '@/utils/helper';
import anchor from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import SampleNfts from '@/assets/data/sample-nfts.json';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  hasNft,
  SOLANA_HOST,
  toPublicKey,
} from '@/utils/solanaHelper';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import {
  Idl,
  Program,
  Provider as AnchorProvider,
} from '@project-serum/anchor';
import { NFT_EXCHANGE_PROGRAM_IDL } from '@/utils/solchickConsts';
import ConsoleHelper from '@/utils/consoleHelper';

interface INftExchange {
  nfts: INft[] | null | undefined;
  selectedNft: INft | null | undefined;
  setSelectedNft: (nft: INft | null | undefined) => void;
  selectedNfts: INft[];
  setSelectedNfts(nfts: INft[]): void;
  shardsDeposit: number;
  chicksDeposit: number;
  shardsDepositStatusCode: TokenStatusCode;
  chicksDepositStatusCode: TokenStatusCode;
  chicksDepositErrorCode: TokenErrorCode;
  shardsDepositErrorCode: TokenErrorCode;
  nftStatusCode: NftStatusCode;
  nftErrorCode: NftErrorCode;
  nftExchangeType: NftExchangeType;
  nftIsProcessing: boolean;
  exchange2dNftForEgg(nftAddress: string | PublicKey): void;
  setNftStatusCode(nftStatusCode: NftStatusCode): void;
  fetchNftData(): void;
}

const NftExchangeContext = React.createContext<INftExchange>({
  nfts: [],
  selectedNft: undefined,
  setSelectedNft: () => undefined,
  selectedNfts: [],
  setSelectedNfts: () => undefined,
  shardsDeposit: 0,
  chicksDeposit: 0,
  shardsDepositStatusCode: TokenStatusCode.NONE,
  chicksDepositStatusCode: TokenStatusCode.NONE,
  chicksDepositErrorCode: TokenErrorCode.NO_ERROR,
  shardsDepositErrorCode: TokenErrorCode.NO_ERROR,
  nftStatusCode: NftStatusCode.NONE,
  nftErrorCode: NftErrorCode.NO_ERROR,
  nftExchangeType: NftExchangeType.NONE,
  nftIsProcessing: false,
  exchange2dNftForEgg: () => undefined,
  setNftStatusCode: () => undefined,
  fetchNftData: () => undefined,
});
export const NftExchangeProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [selectedNft, setSelectedNft] = useState<INft | null | undefined>();
  const [selectedNfts, setSelectedNfts] = useState<INft[]>([]);
  const [shardsDeposit, setShardsDeposit] = useState(0);
  const [chicksDeposit, setChicksDeposit] = useState(0);
  const [shardsDepositStatusCode, setShardsDepositStatusCode] = useState(
    TokenStatusCode.NONE,
  );
  const [chicksDepositStatusCode, setChicksDepositStatusCode] = useState(
    TokenStatusCode.NONE,
  );
  const [nftStatusCode, setNftStatusCode] = useState<NftStatusCode>(
    NftStatusCode.NONE,
  );
  const [nftErrorCode, setNftErrorCode] = useState<NftErrorCode>(
    NftErrorCode.NO_ERROR,
  );
  const [chicksDepositErrorCode, setChicksDepositErrorCode] =
    useState<TokenErrorCode>(TokenErrorCode.NO_ERROR);
  const [shardsDepositErrorCode, setShardsDepositErrorCode] =
    useState<TokenErrorCode>(TokenErrorCode.NO_ERROR);
  const [nftExchangeType, setNftExchangeType] = useState<NftExchangeType>(
    NftExchangeType.NONE,
  );
  const [nftIsProcessing, setNftIsProcessing] = useState<boolean>(false);
  const [nfts, setNfts] = useState<INft[]>();
  const wallet = useSolanaWallet();
  const solanaConnection = useMemo(
    () => new Connection(SOLANA_HOST, `confirmed`),
    [],
  );
  const getAnchorProvider = useCallback(async () => {
    const opts = {
      preflightCommitment: `confirmed`,
    };
    return new AnchorProvider(
      solanaConnection,
      wallet as unknown as AnchorWallet,
      opts.preflightCommitment as unknown as ConfirmOptions,
    );
  }, [solanaConnection, wallet]);

  const fetchNftData = useCallback(async () => {
    if (wallet.publicKey) {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT != `staging`) {
        const responseData = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/wallet?id=${wallet.publicKey?.toBase58()}`,
        );
        const jsonData = await responseData.json();
        setNfts(jsonData.data);
      } else {
        setNfts(SampleNfts as unknown as INft[]);
      }
    }
  }, [wallet.publicKey]);

  const exchange2dNftForEgg = useCallback(
    async (nftAddress: string | PublicKey) => {
      if (!solanaConnection || !wallet || !wallet.publicKey) {
        return;
      }

      const provider = await getAnchorProvider();
      const programIdl = NFT_EXCHANGE_PROGRAM_IDL;
      if (!provider) {
        return;
      }

      const program = new Program(
        programIdl as unknown as Idl,
        toPublicKey(programIdl.metadata.address),
        provider,
      );
      ConsoleHelper(
        `exchange2dNftForEgg -> program id: ${program.programId.toString()}`,
      );
      const EXCHANGE_PDA_SEED = `exchange`;
      const LOCKED_PDA_SEED = `locked`;

      const [exchangePubkey, exchangeBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [
            provider.wallet.publicKey.toBuffer(),
            // tokenAccount.toBuffer(),
            Buffer.from(anchor.utils.bytes.utf8.encode(EXCHANGE_PDA_SEED)),
          ],
          program.programId,
        );

      const [lockedNftAccountPubkey, lockedNftAccountNonce] =
        await anchor.web3.PublicKey.findProgramAddress(
          [
            toPublicKey(nftAddress).toBuffer(),
            Buffer.from(anchor.utils.bytes.utf8.encode(LOCKED_PDA_SEED)),
          ],
          program.programId,
        );

      const nftAccount = await getAssociatedTokenAddress(
        nftAddress,
        wallet.publicKey,
      );

      const [configKey, configNonce] = await PublicKey.findProgramAddress(
        [Buffer.from(EXCHANGE_PDA_SEED)],
        program.programId,
      );
      ConsoleHelper(`nftAccount`, nftAccount.toString());
      ConsoleHelper(`nftAddress`, nftAddress.toString());
      ConsoleHelper(`exchangePubkey`, exchangePubkey.toString());
      ConsoleHelper(`configKey`, configKey.toString());
      ConsoleHelper(
        `lockedNftAccountPubkey`,
        lockedNftAccountPubkey.toString(),
      );

      setNftExchangeType(NftExchangeType.EGG);
      setNftStatusCode(NftStatusCode.NONE);
      setNftIsProcessing(true);

      setNftStatusCode(NftStatusCode.START);

      setNftStatusCode(NftStatusCode.CHECKING);
      if (await hasNft(solanaConnection, wallet.publicKey, nftAddress)) {
        ConsoleHelper(
          `exchange2dNftForEgg -> None!!!: nftAddress: ${nftAddress.toString()}`,
        );
        return;
      }

      setNftStatusCode(NftStatusCode.TRANSFERRING);
      await program.rpc.lock(configNonce, exchangeBump, lockedNftAccountNonce, {
        accounts: {
          signer: provider.wallet.publicKey,
          nftAccount: toPublicKey(nftAccount),
          nftMint: toPublicKey(nftAddress),
          exchangeAccount: exchangePubkey,
          configuration: configKey,
          lockedNftTokenAccount: lockedNftAccountPubkey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      });

      setNftStatusCode(NftStatusCode.PREPARING);
      fetchNftData().then(async () => {
        await sleep(2000);
        setNftStatusCode(NftStatusCode.SUCCESS);
        setNftIsProcessing(false);
        setNftExchangeType(NftExchangeType.NONE);
      });
    },
    [fetchNftData, getAnchorProvider, solanaConnection, wallet],
  );

  useEffect(() => {
    if (!wallet.publicKey) {
      return;
    }
    fetchNftData().then();
  }, [fetchNftData, wallet.publicKey]);

  const contextValue = useMemo(
    () => ({
      nfts,
      setNfts,
      selectedNft,
      setSelectedNft,
      selectedNfts,
      setSelectedNfts,
      shardsDeposit,
      setShardsDeposit,
      chicksDeposit,
      setChicksDeposit,
      shardsDepositStatusCode,
      setShardsDepositStatusCode,
      chicksDepositStatusCode,
      setChicksDepositStatusCode,
      chicksDepositErrorCode,
      setChicksDepositErrorCode,
      shardsDepositErrorCode,
      setShardsDepositErrorCode,
      nftStatusCode,
      setNftStatusCode,
      nftErrorCode,
      setNftErrorCode,
      nftExchangeType,
      setNftExchangeType,
      nftIsProcessing,
      setNftIsProcessing,
      exchange2dNftForEgg,
      fetchNftData,
    }),
    [
      nfts,
      setNfts,
      selectedNft,
      setSelectedNft,
      selectedNfts,
      setSelectedNfts,
      shardsDeposit,
      chicksDeposit,
      shardsDepositStatusCode,
      chicksDepositStatusCode,
      chicksDepositErrorCode,
      shardsDepositErrorCode,
      nftStatusCode,
      setNftStatusCode,
      nftErrorCode,
      setNftErrorCode,
      nftExchangeType,
      setNftExchangeType,
      nftIsProcessing,
      setNftIsProcessing,
      exchange2dNftForEgg,
      fetchNftData,
    ],
  );

  return (
    <NftExchangeContext.Provider value={contextValue}>
      {children}
    </NftExchangeContext.Provider>
  );
};

export const useNftExchange = () => useContext(NftExchangeContext);
