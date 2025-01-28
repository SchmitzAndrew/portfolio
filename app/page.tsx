"use client"

import Background from "@/components/Background";
import StyledBox from "@/components/StyledBox";

export default function Page() {
    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <StyledBox
                    variant="outline"
                    width="45vw"
                    height="27.81vw"
                >
                    <div className="w-full h-full p-8 flex flex-col">
                        <div className="flex flex-col relative">
                            <h1 className="text-white text-3xl font-light tracking-wider">
                                Andrew Schmitz
                            </h1>
                            <div className="absolute top-full left-0 right-0 h-20 mt-4" style={{ width: 'fit-content' }}>
                                <div className="absolute inset-0 border border-white/10" />
                            </div>
                        </div>
                    </div>
                </StyledBox>
            </div>
        </Background>
    );
}
