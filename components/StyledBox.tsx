interface StyledBoxProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
  customStyles?: React.CSSProperties;
  variant?: 'default' | 'glassmorphism' | 'retro' | 'neon' | 'floating' | 'gradient' | 'neumorphism' | 'minimal' | 'cyberpunk' | 'frosted' | 'outline' | 'shadow' | 'glow' | 'modern' | 'simple';
}

export default function StyledBox({
  width = "45vw",
  height = "27.81vw",
  backgroundColor = "black",
  className = "",
  children,
  customStyles = {},
  variant = 'default'
}: StyledBoxProps) {
  const variantStyles = {
    default: "bg-black border border-white/10",
    glassmorphism: "bg-white/10 backdrop-blur-md border border-white/20",
    retro: "bg-black border-2 border-[#ff6b6b] shadow-md",
    neon: "bg-black border border-[#0ff] shadow-[0_0_10px_#0ff]",
    floating: "bg-black shadow-xl hover:-translate-y-1 transition-all duration-300",
    gradient: "bg-black border border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    neumorphism: "bg-[#e0e0e0] shadow-[5px_5px_15px_#bebebe,-5px_-5px_15px_#ffffff]",
    minimal: "bg-white shadow-sm",
    cyberpunk: "bg-black border-l-2 border-[#00ff00]",
    frosted: "bg-white/5 backdrop-blur-lg border border-white/10",
    outline: "bg-black border border-white/30 hover:border-white/50",
    shadow: "bg-black shadow-2xl",
    glow: "bg-black shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    modern: "bg-black bg-opacity-90 backdrop-blur-sm",
    simple: "bg-black/80"
  };

  return (
    <div
      className={`flex items-center justify-center ${variantStyles[variant]} ${className}`}
      style={{
        width: width,
        height: height,
        ...customStyles
      }}
    >
      {children}
    </div>
  );
} 