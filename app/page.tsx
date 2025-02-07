"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";
import { Press_Start_2P } from "next/font/google";
import CenterUnderline from "@/components/CenterUnderline";
import ComesInGoesOutUnderline from "@/components/ComesInGoesOutUnderline";

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ["latin"],
    display: 'swap',
});

export default function Page() {
    const [textWidth, setTextWidth] = useState(300);
    const [textHeight, setTextHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (containerRef.current && h1Ref.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const h1Rect = h1Ref.current.getBoundingClientRect();
            setTextWidth(rect.width);
            setTextHeight(h1Rect.height);
        }
    }, []);

    const cutoutTop = textHeight + 25;
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
                        <h1 ref={h1Ref} className={`${pressStart2P.className} text-3xl`} style={textStyle}>
                            andrew schmitz
                        </h1>
                        <p className={`${pressStart2P.className} text-sm mt-10 max-w-md text-white`}>
                            building <span className="text-white underline cursor-pointer" onClick={() => window.open('https://myminutes.ai', '_blank')}>minutes</span> @ <span className="text-white underline cursor-pointer" onClick={() => window.open('https://slam.ventures', '_blank')}>SLAM</span>
                        </p>

                        <p className={`${pressStart2P.className} text-sm mt-8 max-w-md text-white`}>
                            more andrew schmitz:
                        </p>
                        <ul className={`${pressStart2P.className} text-sm text-white space-y-3`}>
                            <li><ComesInGoesOutUnderline label="twitter" className="text-white mt-3" onClick={() => window.open('https://twitter.com/big_schmitz', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="github" className="text-white" onClick={() => window.open('https://github.com/SchmitzAndrew', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="email" className="text-white" onClick={() => window.open('mailto:schmitzandrew03@gmail.com', '_blank')} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Background>
    );
}
