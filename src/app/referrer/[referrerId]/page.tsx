"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dprojectIcon from "@public/DFastLogo_650x600.svg";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReferrerDetails({ params }: { params: { referrerId: string } }) {
    const [referrerData, setReferrerData] = useState<{ email?: string; name?: string; tokenId?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchReferrerData = async () => {
            try {
                const response = await fetch("/dproject-users.json");
                const data = await response.json();
                const referrer = data.find((item: any) => item.userId.toLowerCase() === params.referrerId.toLowerCase());

                if (referrer) {
                    setReferrerData(referrer);
                }
            } catch (error) {
                console.error("Error fetching referrer data:", error);
            }
        };

        if (params.referrerId) {
            fetchReferrerData();
        }
    }, [params.referrerId]);

    const navigateToMintingPage = () => {
        const data = {
            var1: params.referrerId || "N/A", // Referrer ID from params
            var2: referrerData?.email || "N/A", // Email from referrerData
            var3: referrerData?.name || "N/A", // Name from referrerData
            var4: referrerData?.tokenId || "N/A", // Token ID from referrerData
        };

        // Store data in sessionStorage before navigation
        sessionStorage.setItem("mintingsData", JSON.stringify(data));

        // Navigate to minting page without exposing variables in the URL
        router.push("/referrer/minting");
    };

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">
                <Link href="/" passHref>
                    <Image
                        src={dprojectIcon}
                        alt=""
                        className="mb-4 size-[100px] md:size-[100px]"
                        style={{
                            filter: "drop-shadow(0px 0px 24px #a726a9a8",
                        }}
                    />
                </Link>
                <h1 className="p-4 md:text-2xl text-2xl font-semibold md:font-bold tracking-tighter">
                    สมัครใช้งาน
                </h1>
                <div className="flex justify-center m-5">
                    <ConnectButton
                        locale={"en_US"}
                        client={client}
                        chain={chain}
                        wallets={[inAppWallet({ auth: { options: ["email"] } })]}
                        connectButton={{ label: "ลงทะเบียน" }}
                        connectModal={{
                            title: "เชื่อมต่อกระเป๋า",
                            titleIcon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            size: "wide",
                        }}
                        supportedTokens={{
                            [chain.id]: [
                                { address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", name: "USDC", symbol: "USDC", icon: "https://polygonscan.com/token/images/centre-usdc_32.png" },
                                { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", name: "USDT", symbol: "USDT", icon: "https://polygonscan.com/token/images/tether_32.png" },
                            ],
                        }}
                        supportedNFTs={{
                            [chain.id]: ["0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2"],
                        }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center p-2 m-2">
                <p className="flex flex-col items-center justify-center text-[20px] m-2 text-center">
                        <b>ขณะนี้ ท่านกำลังดำเนินการสมัครสมาชิก ภายใต้การแนะนำของ</b>
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #666",
                            background: "#222",
                            padding: "10px",
                            margin: "6px",
                            borderRadius: "8px",
                        }}
                    >
                        <p style={{ fontSize: "18px" }}>
                            {params.referrerId ? `${params.referrerId.slice(0, 6)}...${params.referrerId.slice(-4)}` : "ไม่พบกระเป๋า"}
                        </p>
                    </div>
                    {referrerData ? (
                        <div className="mt-4 text-center gap-6">
                            <p className="text-lg text-gray-300 break-all">
                                <b>อีเมล:</b> {referrerData.email}
                            </p>
                            <p className="text-lg text-gray-300 mt-1">
                                <b>ชื่อ:</b> {referrerData.name}
                            </p>
                            <p className="text-lg text-red-600 mt-1">
                                <b>Token ID: {referrerData.tokenId} </b>
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm mt-2">ไม่พบข้อมูลผู้แนะนำ</p>
                    )}
                </div>
                <div className="flex flex-col items-center mb-6">
                    <button onClick={navigateToMintingPage} className="flex flex-col mt-1 border border-zinc-100 px-4 py-3 rounded-lg bg-red-700 hover:bg-zinc-800 transition-colors hover:border-zinc-400">
                        ดำเนินการต่อ
                    </button>
                </div>
            </div>
        </main>
    );
}