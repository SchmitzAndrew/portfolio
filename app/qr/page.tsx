import AnimatedName from "@/components/AnimatedName";
import Image from 'next/image'
import React from 'react';



export default function Qr() {
    return (
        <>
                <div className="pt-4">
                    <AnimatedName />
                    <div className="flex justify-center ">
                        <div className="px-4 py-12 ">
                            <Image src="/images/qr_code.png" alt="qr code" width={500} height={500} />
                        </div>
                    </div>
                </div>
        </>
    )
}