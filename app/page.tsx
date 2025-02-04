"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
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
    const cutoutBottom = cutoutTop + 28;

    const textStyle = {
        color: 'white',
        textShadow: '2px 2px 0 #000',
        imageRendering: 'pixelated',
        letterSpacing: '0.1em',
        transform: 'scale(1, 1.2)',
        fontSmooth: 'never',
        WebkitFontSmoothing: 'none'
    } as const;

    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="h-[45vh] aspect-[1.618] relative">
                    <div className="absolute inset-0 bg-black" style={{
                        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30px 0%, 30px ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutTop}px, 30px ${cutoutTop}px, 30px 0%, 0% 0%)`
                    }} />
                    <div ref={containerRef} className="absolute top-8 left-8">
                        <h1 className={`${pressStart2P.className} text-3xl`} style={textStyle}>
                            andrew schmitz
                        </h1>
                        <p className={`${pressStart2P.className} text-sm mt-16 max-w-md text-white`}>
                            building <a href="https://myminutes.ai" className="underline hover:text-sky-500/90">minutes</a> @ <a href="https://slam.ventures" className="hover:text-sky-500/90 underline">SLAM</a>
                        </p>

                    </div>
                </div>
            </div>
        </Background>
    );
}
