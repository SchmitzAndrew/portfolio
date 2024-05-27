import Head from 'next/head'
import Image from 'next/image'
import React from 'react';



export default function Qr() {
    return (
        <>
        <div className='bg-[#04081a] min-h-screen'>
        <div className = "pt-4">
                    <div className="flex justify-center ">
                        <h1 className="title-gradient text-6xl md:text-8xl  text-center px-4 ">
                            Andrew Schmitz
                        </h1>
                    </div>
                </div>
            <div className = "p-6 pt-10 ">
                <Image src="/qr_code.png" alt="qr code" width={500} height={500} />
            </div>
        </div>
        </>
    )
}