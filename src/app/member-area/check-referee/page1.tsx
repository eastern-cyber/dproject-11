"use client";

import Image from "next/image";
import {  ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react";
import dprojectIcon from "@public/DFastLogo_650x600.svg";
import { client } from "../../client";
import { chain  } from "../../chain";
import { inAppWallet } from "thirdweb/wallets";
import { getContract, toEther } from "thirdweb";
import { defineChain, polygon } from "thirdweb/chains";
import { contract } from "../../../../utils/contracts";
import { getContractMetadata } from "thirdweb/extensions/common";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RefereeData {
    refereeId: string;
    referrerId: string;
  }
  
  interface ReferrerData {
    referrerId: string;
    name?: string;
    email?: string;
    tokenId?: string;
  }

export default function RefereePage() {
    // const for Active Account
    const account = useActiveAccount();

    const { data: nftMetadata } = useReadContract(
        getContractMetadata,
        {
          contract: contract,
        }
      );
    
    //const for Referrers and Referees Details
    const [referees, setReferees] = useState<RefereeData[] | null>(null);
    const [referrers, setReferrers] = useState<ReferrerData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    // Use relative paths from GitHub Raw file
    // const refereesUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-11/main/public/referees.json";
    // const referrersUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-11/main/public/referrers.json";

    // Use relative paths to refer to files in the /public folder
    const refereesUrl = "/referees.json";
    const referrersUrl = "/referrers.json";

    useEffect(() => {
        Promise.all([
          fetch(refereesUrl).then((res) => res.json()),
          fetch(referrersUrl).then((res) => res.json())
        ])
          .then(([refereesData, referrersData]) => {
            // Ensure that referrerId exists and is not empty
            const validReferrers = referrersData.filter((item: ReferrerData) => item.referrerId && item.referrerId.trim() !== "");
            setReferees(refereesData);
            setReferrers(validReferrers);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error loading JSON:", err);
            setLoading(false);
          });
      }, []);
    
      if (loading) {
        return <div className="p-6">Loading...</div>;
      }
    
      if (!referees || !referrers) {
        return <div className="p-6 text-red-600">Failed to load data.</div>;
      }
    
      // Step 1: Find all refereeIds for the entered referrerId
      const matchingReferees = referees.filter((item) => item.referrerId === referrerId);
      const matchingRefereeIds = matchingReferees.map(item => item.refereeId);
    
      // Step 2: Find all referrer records where referrerId matches refereeId
      const matchingReferrerRecords = referrers.filter((item) => matchingRefereeIds.includes(item.referrerId));
    
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
                <div className="flex justify-center mb-10">
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
                        connectButton={{ label: "ล็อกอิน" }}
                        connectModal={{
                            title: "เชื่อมต่อกระเป๋า",
                            titleIcon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            size: "wide", // Change to "compact" or "auto" 
                        }}
                        supportedTokens={{
                        [chain.id]: [
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
                <div className="flex flex-col justify-center items-center">
                    <WalletBalances walletAddress={account?.address || ""}/>
                </div>
                <h1 className="text-center text-[18px] font-bold">ตรวจสอบรายชื่อผู้ที่ท่านแนะนำ</h1>
        <h2 className="text-center text-[17px]">ใส่เลขกระเป๋าของท่าน</h2>
        <input
            type="text"
            placeholder="ใส่เลขกระเป๋าของผู้ที่ต้องการตรวจสอบสายงาน"
            value={referrerId}
            onChange={(e) => setReferrerId(e.target.value)}
            className="border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
        />

        <h2 className="text-center text-[18px] font-semibold mt-4">รายการผู้ที่ท่านแนะนำ</h2>
        {matchingReferrerRecords.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
            <thead>
                <tr>
                <th className="border border-gray-400 px-4 py-2">ผู้ที่ท่านแนะนำ</th>
                <th className="border border-gray-400 px-4 py-2">ชื่อ</th>
                <th className="border border-gray-400 px-4 py-2">อีเมล</th>
                <th className="border border-gray-400 px-4 py-2">Token ID</th>
                </tr>
            </thead>
            <tbody>
                {matchingReferrerRecords.map((item: ReferrerData) => (
                <tr key={item.referrerId}>
                    <td className="border border-gray-400 px-4 py-2">{item.referrerId.slice(0, 6)}...{item.referrerId.slice(-4)}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.name || "N/A"}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.email || "N/A"}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.tokenId || "N/A"}</td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p className="mt-2 text-gray-400">No referees found for this referrer ID.</p>
        )}
            <div className="flex flex-col mt-8 justify-center items-center w-full">
                <Link 
                    className="flex flex-col border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-800"
                    href="/member-area">
                    <p className="text-center text-[19px]">กลับสู่พื้นที่สมาชิก</p>
                </Link>
            </div>
            </div> 
            <div className="flex flex-col items-center">
                    <Link 
                        className="flex flex-col mt-4 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors hover:border-zinc-800"
                        href="/">
                        กลับหน้าหลัก
                    </Link>
            </div>
        </main>
    );
    
}

function  Header() {
    return (
        <header className="flex flex-col items-center mb-12 mb:mb-20">
            <Link href="/" passHref>
                <Image
                    src={dprojectIcon}
                    alt=""
                    className="mb-4 size-[100px] md:size-[100px]"
                    style={{
                        filter: "drop-shadow(0px 0px 24px #a726a9a8"
                    }}
                />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
               Check Referee
            </h1>
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
        </div>
    )
};

const WalletBalances: React.FC<walletAddresssProps> = ({ walletAddress }) => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
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
              }}
            >
                {/* <p style={{fontSize: "24px"}}><b>รายการทรัพย์สิน</b></p> */}
                <p style={{fontSize: "19px"}}><b>เลขที่กระเป๋าของท่าน</b></p>
                <div style={{border: "1px solid #444", background: "#222", padding: "0px 6px", margin: "6px"}}>
                <p className="text-[18px] break-all">{walletAddress ? walletAddress || "" : "ยังไม่ได้เชื่อมกระเป๋า !"} </p>    
                </div>
            </div>
        </div>
    )
};