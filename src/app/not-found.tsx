"use client";
import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
    <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">                
        <p>Please wait for system update to Plan B System</p>
        <p>ปิดระบบชั่วคราวเพื่อเตรียมรองรับแผน B</p>
        <div className="flex flex-col items-center">
            <Link 
                className="flex flex-col mt-8 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors hover:border-zinc-800"
                href="/">
                Home / กลับหน้าหลัก
            </Link>
        </div>
    </div>
    </main>
  )
}
