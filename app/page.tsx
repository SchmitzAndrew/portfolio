"use client"

import Background from "@/components/Background";
import StyledBox from "@/components/StyledBox";

export default function Page() {
    const variants: Array<{
        variant: 'default' | 'glassmorphism' | 'retro' | 'neon' | 'floating' | 'gradient' | 'neumorphism' | 'minimal' | 'cyberpunk' | 'frosted' | 'outline' | 'shadow' | 'glow' | 'modern' | 'simple',
        title: string
    }> = [
            { variant: 'glassmorphism', title: 'Glass Effect' },
            { variant: 'outline', title: 'Clean Outline' },
            { variant: 'shadow', title: 'Soft Shadow' },
            { variant: 'modern', title: 'Modern Dark' },
            { variant: 'simple', title: 'Simple Clean' },
            { variant: 'floating', title: 'Floating Box' },
            { variant: 'neon', title: 'Neon Accent' },
            { variant: 'frosted', title: 'Frosted Glass' },
            { variant: 'glow', title: 'Subtle Glow' },
            { variant: 'gradient', title: 'Gradient Edge' },
            { variant: 'retro', title: 'Minimal Retro' },
            { variant: 'cyberpunk', title: 'Tech Edge' },
            { variant: 'minimal', title: 'Pure Minimal' },
            { variant: 'neumorphism', title: 'Soft Design' },
            { variant: 'default', title: 'Classic Dark' }
        ];

    return (
        <Background>
            <div className="w-full py-20">
                <div className="flex flex-col items-center space-y-16">
                    {variants.map(({ variant, title }) => (
                        <StyledBox
                            key={variant}
                            variant={variant}
                            width="45vw"
                            height="27.81vw"
                            className="transition-all duration-300 hover:scale-[1.02]"
                        >
                            <h2 className={`${variant === 'neumorphism' ? 'text-black' : 'text-white'} text-3xl font-bold`}>
                                {title}
                            </h2>
                        </StyledBox>
                    ))}
                </div>
            </div>
        </Background>
    );
}
