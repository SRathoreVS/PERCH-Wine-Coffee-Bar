import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePostion'
import { useMediaQuery } from '../../hooks/useMediaQuery'


export default function CustomCursor() {
    const { x, y } = useMousePosition()
    const [isHovering, setIsHovering] = useState(false)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const springConfig = { damping: 25, stiffness: 300 }
    const cursorX = useSpring(x, springConfig)
    const cursorY = useSpring(y, springConfig)

    useEffect(() => {
        const handleMouseOver = (e) => {
            const target = e.target
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.dataset.cursor === 'pointer'
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseOut = () => setIsHovering(false)

        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)

        return () => {
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-wine-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Trailing cursor */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-wine-400/50 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
            />
        </>
    )
}
