"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";
import { Press_Start_2P } from "next/font/google";
import ComesInGoesOutUnderline from "@/components/ComesInGoesOutUnderline";
import { useColorScheme } from "@/hooks/useColorScheme";

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ["latin"],
    display: 'swap',
});

export default function Page() {
    const [textWidth, setTextWidth] = useState<number | null>(null);
    const [textHeight, setTextHeight] = useState<number | null>(null);
    const [fontSize, setFontSize] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const isDark = useColorScheme();

    useEffect(() => {
        const updateMeasurements = () => {
            if (containerRef.current && h1Ref.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const h1Rect = h1Ref.current.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(h1Ref.current);
                const computedFontSize = parseFloat(computedStyle.fontSize);

                // Create a temporary span to measure individual lines
                const span = document.createElement('span');
                span.style.font = computedStyle.font;
                span.style.visibility = 'hidden';
                span.style.position = 'absolute';
                span.style.whiteSpace = 'nowrap';
                span.style.letterSpacing = '0.1em';
                span.style.transform = 'scale(1, 1.2)';
                document.body.appendChild(span);

                // Measure "andrew" and "schmitz" separately
                span.textContent = 'andrew';
                const andrewWidth = span.getBoundingClientRect().width;
                span.textContent = 'schmitz';
                const schmitzWidth = span.getBoundingClientRect().width;

                // Use the width of the longest line when text wraps (on mobile)
                const maxLineWidth = Math.max(andrewWidth, schmitzWidth);
                const isMobile = window.innerWidth < 768; // md breakpoint
                setTextWidth(isMobile ? maxLineWidth : rect.width);

                document.body.removeChild(span);
                setTextHeight(h1Rect.height);
                setFontSize(computedFontSize);
            }
        };

        updateMeasurements();
        window.addEventListener('resize', updateMeasurements);
        return () => window.removeEventListener('resize', updateMeasurements);
    }, []);

    const padding = fontSize ? fontSize * 0.75 : 0;
    const cutoutTop = textHeight ? textHeight + padding : 0;
    const cutoutBottom = textHeight ? cutoutTop + padding : 0;

    const textStyle = {
        color: isDark ? 'white' : 'black',
        textShadow: isDark ? '2px 2px 0 #000' : '2px 2px 0 #fff',
        imageRendering: 'pixelated',
        letterSpacing: '0.1em',
        transform: 'scale(1, 1.2)',
        fontSmooth: 'never',
        WebkitFontSmoothing: 'none'
    } as const;

    const measurementContainer = (
        <div className="absolute opacity-0 pointer-events-none">
            <div ref={containerRef}>
                <h1 ref={h1Ref} className={`${pressStart2P.className} text-3xl`} style={textStyle}>
                    andrew schmitz
                </h1>
            </div>
        </div>
    );

    if (!textWidth || !textHeight || !fontSize) {
        return (
            <Background>
                <div className="w-full h-screen flex items-center justify-center">
                    {measurementContainer}
                </div>
            </Background>
        );
    }

    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="h-[50vh] md:aspect-[1.618] aspect-[0.8] relative">
                    <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`} style={{
                        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, calc(1em + 2px) 0%, calc(1em + 2px) ${cutoutBottom}px, calc(1em + ${textWidth}px + 2px) ${cutoutBottom}px, calc(1em + ${textWidth}px + 2px) ${cutoutTop}px, calc(1em + 2px) ${cutoutTop}px, calc(1em + 2px) 0%, 0% 0%)`
                    }} />
                    <div ref={containerRef} className="absolute top-[1em] md:top-[1.25em] left-[1em] md:left-[1.25em]">
                        <h1 ref={h1Ref} className={`${pressStart2P.className} text-2xl md:text-3xl group`} style={textStyle}>
                            andrew schmitz<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl font-sans align-middle"> ᵕ̈</span>
                        </h1>
                        <p className={`${pressStart2P.className}  text-md mt-12  md:mt-16 max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
                            building something new...
                        </p>

                        <p className={`${pressStart2P.className}  text-md mt-12 md:mt-8 mb-3 md:mb-4 max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
                            more:
                        </p>
                        <ul className={`${pressStart2P.className} text-md ${isDark ? 'text-white' : 'text-black'} space-y-2 md:space-y-3`}>
                            <li><ComesInGoesOutUnderline label="twitter" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('https://twitter.com/big_schmitz', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="github" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('https://github.com/SchmitzAndrew', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="email" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('mailto:schmitzandrew03@gmail.com', '_blank')} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Background>
    );
}
