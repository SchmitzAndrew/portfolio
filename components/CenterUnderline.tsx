"use client"

import { useEffect, useRef } from "react"
import { motion, ValueAnimationTransition } from "framer-motion"

interface UnderlineProps {
  label: string
  className?: string
  transition?: ValueAnimationTransition
  onClick?: () => void
  underlineHeightRatio?: number
  underlinePaddingRatio?: number
}

const CenterUnderline = ({
  label,
  className,
  onClick,
  transition = { duration: 0.25, ease: "easeInOut" },
  underlineHeightRatio = 0.1, // Default to 10% of font size
  underlinePaddingRatio = 0.01, // Default to 1% of font size
  ...props
}: UnderlineProps) => {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        const underlineHeight = fontSize * underlineHeightRatio
        const underlinePadding = fontSize * underlinePaddingRatio
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        )
      }
    }

    updateUnderlineStyles()
    window.addEventListener("resize", updateUnderlineStyles)

    return () => window.removeEventListener("resize", updateUnderlineStyles)
  }, [underlineHeightRatio, underlinePaddingRatio])

  const underlineVariants = {
    initial: {
      width: "0%",
      left: "50%",
      x: "-50%",
    },
    hover: {
      width: "100%",
      left: "50%",
      x: "-50%",
      transition: transition,
    },
  }

  return (
    <motion.span
      className={`relative inline-block cursor-pointer ${className}`}
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      ref={textRef}
      {...props}
    >
      <span>{label}</span>
      <motion.span
        className="absolute bg-current"
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
        }}
        variants={underlineVariants}
      />
    </motion.span>
  )
}

export default CenterUnderline 