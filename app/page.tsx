"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";
import { Racing_Sans_One } from "next/font/google";


const racingSansOne = Racing_Sans_One({
    weight: '400',
    subsets: ["latin"],
    display: 'swap',
});

export default function Page() {
    const [textWidth, setTextWidth] = useState(300);
    const [textHeight, setTextHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setTextWidth(rect.width);
            setTextHeight(rect.height);
        }
    }, []);

    const cutoutTop = -38 + textHeight;
    const cutoutBottom = cutoutTop + 35;

    const textStyle = {
        WebkitTextStroke: '2px white',
        color: 'transparent'
    };

    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="h-[45vh] aspect-[1.618] relative">
                    <div className="absolute inset-0 bg-black" style={{
                        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30px 0%, 30px ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutTop}px, 30px ${cutoutTop}px, 30px 0%, 0% 0%)`
                    }} />
                    <div ref={containerRef} className="absolute top-8 left-8">
                        <h1 className={`text-6xl font-bold italic`} style={textStyle}>
                            andrew schmitz
                        </h1>
                        <p className="text-white text-lg mt-16 max-w-md">
                            building <a href="https://myminutes.ai" className="underline">minutes</a> @ <a href="https://slam.ventures">SLAM</a> 

                        </p>
                    </div>

                </div>
            </div>
        </Background>
    );
}
