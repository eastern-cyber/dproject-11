"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount, darkTheme } from "thirdweb/react";
import dprojectIcon from "@public/DProjectLogo_650x600.svg";
import { client } from "../../client";
import { chain } from "../../chain";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    inAppWallet,
    createWallet,
  } from "thirdweb/wallets";

interface UserData {
    userId: string;
    referrerId: string;
    name?: string;
    email?: string;
    tokenId?: string;
}

export default function RefereePage() {
    const account = useActiveAccount();
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    const usersUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.1/main/public/dproject-users.json";


    useEffect(() => {
        if (account?.address) {
            setReferrerId(account.address);
        }
    }, [account?.address]);

    useEffect(() => {
        fetch(usersUrl)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
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

    if (!users) {
        return <div className="p-6 text-red-600">Failed to load data.</div>;
    }

    // const matchingUsers = users.filter((user) => user.referrerId === referrerId);
    const matchingUsers = referrerId.trim()
    ? users
        .filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
        .map((user, index) => ({ ...user, recordNumber: index + 1 }))
    : [];

    // const matchingUsers = referrerId.trim()
    // ? users.filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
    // : [];

    // const matchingUsers = users.filter((user) => user.referrerId === referrerId && user.userId.trim() !== "");

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
                            // {
                            //     address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
                            //     name: "DProject",
                            //     symbol: "DFI",
                            //     icon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            // },
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
                        theme={darkTheme({
                        colors: {
                            modalBg: "hsl(241, 51%, 23%)",
                            borderColor: "hsl(60, 99%, 56%)",
                            accentText: "hsl(0, 100%, 60%)",
                            separatorLine: "hsl(22, 100%, 37%)",
                            secondaryText: "hsl(251, 20%, 50%)",
                            primaryText: "hsl(240, 89%, 93%)",
                            accentButtonBg: "hsl(22, 100%, 37%)",
                            tertiaryBg: "hsl(231, 11%, 12%)",
                            accentButtonText: "hsl(0, 0%, 97%)",
                            connectedButtonBg: "hsl(241, 51%, 23%)",
                            connectedButtonBgHover: "hsl(241, 50%, 17%)",
                        },
                        })}
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <WalletBalances walletAddress={account?.address || ""} />
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
                
                {matchingUsers.length > 0 && (
                    <>
                        <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">#</th>
                                    <th className="border border-gray-400 px-4 py-2">เลขกระเป๋า (ย่อ) </th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchingUsers.map((user) => (
                                    <tr key={user.userId}>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {user.recordNumber}
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <b>เลขกระเป๋า</b>(ย่อ)<b>:</b> {user.userId.slice(0, 6)}...{user.userId.slice(-4)}<br />
                                            <b>เลขกระเป๋า</b>(เต็ม)<b>:</b> {user.userId}<br />
                                            <b>อีเมล:</b> {user.email || "N/A"}<br />
                                            <b>ชื่อ:</b> {user.name || "N/A"}<br />
                                            <b>Token ID:</b> {user.tokenId || "N/A"}<br />
                                        </td>
                                        {/* <td className="border border-gray-400 px-4 py-2">{user.tokenId || "N/A"}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-4 text-lg font-semibold">
                            รวม : {matchingUsers.length} ท่าน
                        </p>
                    </>
                )}


                {/* {matchingUsers.length > 0 ? (
                    <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">User ID</th>
                                <th className="border border-gray-400 px-4 py-2">ชื่อ</th>
                                <th className="border border-gray-400 px-4 py-2">อีเมล</th>
                                <th className="border border-gray-400 px-4 py-2">Token ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchingUsers.map((user) => (
                                <tr key={user.userId}>
                                    <td className="border border-gray-400 px-4 py-2">{user.userId.slice(0, 6)}...{user.userId.slice(-4)}</td>
                                    <td className="border border-gray-400 px-4 py-2">{user.name || "N/A"}</td>
                                    <td className="border border-gray-400 px-4 py-2">{user.email || "N/A"}</td>
                                    <td className="border border-gray-400 px-4 py-2">{user.tokenId || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-2 text-gray-400">No referees found for this referrer ID.</p>
                )} */}
                <div className="flex flex-col mt-8 justify-center items-center w-full">
                    <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-800" href="/member-area">
                        <p className="text-center text-[19px]">กลับสู่พื้นที่สมาชิก</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}

function Header() {
    return (
        <header className="flex flex-col items-center mb-12">
            <Link href="/" passHref>
                <Image
                    src={dprojectIcon}
                    alt=""
                    className="mb-4 size-[100px]"
                    style={{ filter: "drop-shadow(0px 0px 24px #a726a9a8" }}
                />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
                Check Referee
            </h1>
        </header>
    );
}

const WalletBalances: React.FC<{ walletAddress?: string }> = ({ walletAddress }) => {
    return (
        <div className="flex flex-col items-center p-6">
            <p className="text-[19px]"><b>เลขที่กระเป๋าของท่าน</b></p>
            <div className="border border-gray-400 bg-gray-800 p-2 mt-2 rounded">
                <p className="text-[18px] break-all">{walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}</p>
            </div>
        </div>
    );
};
