//sunyapakorn.1958@gmail.com : 0x0a11986fd85AAe898Ee34757eBbA93454647C63D
"use client";

import Image from "next/image";
import {  ConnectButton, MediaRenderer, TokenIcon, TokenProvider, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import dprojectIcon from "@public/DFastLogo_650x600.svg";
import { client } from "../../client";
import { chain  } from "../../chain";
import { inAppWallet } from "thirdweb/wallets";
import { getContract, toEther } from "thirdweb";
import { defineChain, polygon } from "thirdweb/chains";
import { claimTo as claimERC1155, balanceOf as balanceOfERC1155 } from "thirdweb/extensions/erc1155";
import { claimTo as claimERC20, balanceOf as balanceOfERC20 } from "thirdweb/extensions/erc20";
import { contract } from "../../../../utils/contracts";
import { getContractMetadata } from "thirdweb/extensions/common";


export default function Refferrer() {
    const account = useActiveAccount();

    const { data: contractMetadata } = useReadContract(
        getContractMetadata,
        {
          contract: contract,
        }
      );

      function NFTMetadata() {
        return(
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                margin: "20px",
                border: "1px solid #333",
                borderRadius: "8px",
              }}>
                {contractMetadata && (

                    <div>
                    <MediaRenderer
                      client={client}
                      src={contractMetadata.image}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                    </div>
                )}
        </div>
        );
      }

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    margin: "20px",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}>
                <Header />
                <div className="flex justify-center mb-20">
                    <ConnectButton locale={"en_US"}
                        client={client}
                        // accountAbstraction={{
                        //     chain: chain,
                        //     sponsorGas: true,
                        // }}
                        wallets={[ inAppWallet ({
                        auth: {
                            options: [
                                "email",
                            ]
                        }
                        }) ]}
                    />
                </div>
                {/* <NFTMetadata /> */}
                <div className="flex flex-col items-center mb-6">
                    <ClaimButtons walletAddress={account?.address || ""}/>
                </div>
                <div className="flex flex-col items-center mb-6">
                    <WalletBalances walletAddress={account?.address || ""}/>
                </div>

            </div> 
            <div className="flex flex-col items-center">
                    <a 
                        className="flex flex-col mt-8 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors hover:border-zinc-800"
                        href="/">กลับหน้าหลัก</a>
            </div>
        </main>
    )
    
}

function  Header() {
    return (
        <header className="flex flex-col items-center mb-20 mb:mb-20">
            <Image
                src={dprojectIcon}
                alt=""
                className="mb-4 size-[100px] md:size-[100px]"
                style={{
                    filter: "drop-shadow(0px 0px 24px #a726a9a8"
                }}
            />

            <h1 className="p-4 text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
               สมัครใช้งาน
            </h1>
            <p>ผู้แนะนำ: sunyapakorn.1958@gmail.com</p>
            <p>0x0a11986fd85AAe898Ee34757eBbA93454647C63D</p>
        </header>
    );
}

type walletAddresssProps = {
    walletAddress?: string;
};

const ClaimButtons: React.FC<walletAddresssProps> = ({ walletAddress }) => {
    const nftContract = getContract({
        client: client,
        chain: defineChain(polygon),
        address: "0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2"
    });
    const dfastContract = getContract({
        client: client,
        chain: defineChain(polygon),
        address: "0xca23b56486035e14F344d6eb591DC27274AF3F47"
    })

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-8">
            <p>กดปุ่มด้านล่างเพื่อซื้อคูปอง
            ผู้ใช้งานพรีเมี่ยมของ
            แอพพลิเคชั่นก๊อกๆๆ</p>
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
                <TransactionButton
                        // className="border bg-zinc-800 border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-100 transition-colors hover:border-zinc-300"
                        transaction={() => claimERC1155({
                            contract: nftContract,
                            to: walletAddress || "",
                            tokenId: 3n,
                            quantity: 1n
                        })}
                        onTransactionConfirmed={async () => {
                            alert("ทำรายการซื้อ คูปอง 3K NFT เรียบร้อย ");
                        }}
                >ซื้อคูปอง 3K NFT</TransactionButton>
            </div>  
        </div>
    )
};

const WalletBalances: React.FC<walletAddresssProps> = ({ walletAddress }) => {
    const { data: nftBalance } = useReadContract(
        balanceOfERC1155,
        {
            contract: getContract({
                client: client,
                chain: defineChain(polygon),
                address: "0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2"
            }),
            owner: walletAddress || "",
            tokenId: 3n
        }
    );
    const { data: dfastBalance } = useReadContract(
        balanceOfERC20,
        {
            contract: getContract({
                client: client,
                chain: defineChain(polygon),
                address: "0xca23b56486035e14F344d6eb591DC27274AF3F47"
            }),
            address: walletAddress || ""
        }
    );
    const { data: polBalance } = useReadContract(
        balanceOfERC20,
        {
            contract: getContract({
                client: client,
                chain: defineChain(polygon),
                address: "0x0000000000000000000000000000000000001010"
            }),
            address: walletAddress || ""
        }
    );
    const { data: usdcBalance } = useReadContract(
        balanceOfERC20,
        {
            contract: getContract({
                client: client,
                chain: defineChain(polygon),
                address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
            }),
            address: walletAddress || ""
        }
    );
    const { data: usdtBalance } = useReadContract(
        balanceOfERC20,
        {
            contract: getContract({
                client: client,
                chain: defineChain(polygon),
                address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
            }),
            address: walletAddress || ""
        }
    );

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            // border: "1px solid #333",
            // borderRadius: "8px",
          }}>
            <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                fontSize: "24px",
                justifyContent: "center",
                paddingBottom: "20px",
                // border: "1px solid #333",
                // borderRadius: "8px",
              }}
            >
                <p style={{fontSize: "24px"}}><b>รายการทรัพย์สิน</b></p>
                <p style={{fontSize: "19px"}}><b>เลขที่กระเป๋า</b></p>
                <div style={{border: "1px solid #444", background: "#222", padding: "0px 6px", margin: "6px"}}>
                <p style={{fontSize: "18px"}}>{walletAddress ? walletAddress || "" : "ยังไม่ได้เชื่อมกระเป๋า !"} </p>    
                </div>
            </div>
            
            <p>คูปอง 3K NFT: {walletAddress ? nftBalance?.toString() : "0"} รายการ</p>
            
            <p>เหรียญ DFast: {walletAddress? 
                new Intl.NumberFormat("en-US",{minimumFractionDigits: 2,maximumFractionDigits: 2,})
                .format(Number(toEther(dfastBalance || 0n))): "0"}
            </p>
            
            <p>เหรียญ USDC: {walletAddress ? (Number(usdcBalance) / 1_000_000).toFixed(2) : "0"}</p>
            
            <p>เหรียญ USDT: {walletAddress ? (Number(usdtBalance) / 1_000_000).toFixed(2) : "0"}</p>
            
            <p>เหรียญ POL: {walletAddress? 
                new Intl.NumberFormat("en-US",{minimumFractionDigits: 2,maximumFractionDigits: 6,})
                .format(Number(toEther(polBalance || 0n))): "0"}
                {/* {walletAddress ? (Number(toEther(polBalance || 0n))).toFixed(2) : "0"} */}
            </p>
        </div>
    )
};