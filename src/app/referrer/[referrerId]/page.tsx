"use client";
import { chain } from '@/app/chain';
import { client } from '@/app/client';
import React from 'react'
// import { getContractMetadata } from 'thirdweb/extensions/common';
import { ConnectButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { inAppWallet } from 'thirdweb/wallets';
// import { contract } from '../../../../utils/contracts';

export default function page({ 
    params,
 }: {
    params: { referrerId: string };
}) {

    const account = useActiveAccount();
    
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">
                <h1 className="p-4 text-1xl md:text-3xl text-2xl font-semibold md:font-bold tracking-tighter">
                    สมัครใช้งาน
                </h1>
                <div className="flex justify-center mb-2">
                    <ConnectButton locale={"en_US"} 
                        client={client}
                        chain={chain}
                        wallets={[ inAppWallet ({
                        auth: {
                            options: [
                                "email",
                            ]
                            }
                        }) ]}
                        connectModal={{
                            title: "เชื่อมต่อกระเป๋า",
                            titleIcon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            size: "wide", // Change to "compact" or "auto" 
                        }}
                        supportedTokens={{
                        [chain.id]: [
                            {
                                address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
                                name: "DProject",
                                symbol: "DFI",
                                icon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            },
                            {
                                address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
                                name: "USDC",
                                symbol: "USDC",
                                icon: "https://polygonscan.com/token/images/centre-usdc_32.png",
                            },
                            {
                                address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                                name: "USDT",
                                symbol: "USDT",
                                icon: "https://polygonscan.com/token/images/tether_32.png",
                                },
                        ],
                        }}
                        supportedNFTs={{
                        [chain.id]: [
                            "0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2", // nft contract address
                        ],
                        }}
                    />
                </div>
                <div>
                    {/* <p>ผู้แนะนำ: sunyapakorn.1958@gmail.com</p>*/}
                    <p style={{fontSize: "19px"}}><b>เลขที่กระเป๋าของผู้แนะนำ</b></p>
                        <div style={{border: "1px solid #666", background: "#222", padding: "0px 6px", margin: "10px"}}>
                        {/* <p style={{fontSize: "18px"}}>{params.referrerId}</p> */}
                        <p style={{ fontSize: "18px" }}>
                            {params.referrerId ? `${params.referrerId.slice(0, 6)}...${params.referrerId.slice(-4)}` : ""}
                        </p>
                        </div>
                </div>
                <div className="flex flex-col items-center mb-6">
                    {/* <WalletPublicKey walletAddress={account?.address || ""}/> */}
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

// type walletAddresssProps = {
//     walletAddress?: string;
// };

// const WalletPublicKey: React.FC<walletAddresssProps> = ({ walletAddress }) => {

//     const account = useActiveAccount();

//     const { data: contractMetadata } = useReadContract(
//         getContractMetadata,
//         {
//           contract: contract,
//         }
//       );

//     return (
//         <div style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             alignItems: "center",
//             justifyContent: "center",
//           }}>
//             <div 
//             style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 width: "100%",
//                 fontSize: "24px",
//                 justifyContent: "center",
//                 paddingTop: "15px",
//                 paddingBottom: "5px",
//               }}
//             >
//                 <span className="mt-4 text-[22px]">ลิ้งค์แนะนำของท่าน</span>
//                 <div style={{border: "1px solid #666", background: "#222", padding: "4px 8px", margin: "6px"}}>
//                 <p className="text-[16px] break-all">{walletAddress ? `https://dfi.fund/referrer/${walletAddress}` : "ยังไม่ได้เชื่อมกระเป๋า !"} </p>    
//                 </div>
//                 <div>
//                 {/* <p className="text-[16px] break-all">{walletAddress ? walletAddress || "" : "ยังไม่ได้เชื่อมกระเป๋า !"} </p> */}
//                 </div>
//                 <div className="flex flex-col items-center justify-center p-5 border border-gray-800 rounded-lg text-lg text-center font-bold mt-10">
//                     เตรียมเปิดร้านค้าออนไลน์<br />และประชาสัมพันธ์ผ่านแอ๊พ <span className="mt-2 text-[#eb1c24] text-3xl animate-blink">ก๊อกๆๆ !</span>
//                 </div>
//             </div>
//         </div>
//     )
// };