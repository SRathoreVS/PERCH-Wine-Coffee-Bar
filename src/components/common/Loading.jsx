import { motion } from 'framer-motion'
import { Wine, Coffee } from 'lucide-react'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream-50 dark:bg-coffee-950">
            <div className="relative">
                {/* Animated rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-wine-500/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ width: 120, height: 120, margin: 'auto' }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary-500/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                    }}
                    style={{ width: 120, height: 120, margin: 'auto' }}
                />

                {/* Center logo */}
                <motion.div
                    className="relative flex items-center justify-center w-24 h-24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                    <Wine className="absolute w-10 h-10 text-wine-600" style={{ top: 0 }} />
                    <Coffee className="absolute w-10 h-10 text-primary-600" style={{ bottom: 0 }} />
                </motion.div>

                {/* Loading text */}
                <motion.p
                    className="mt-8 text-center font-display text-lg text-coffee-600 dark:text-cream-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Pouring your experience...
                </motion.p>
            </div>
        </div>
    )
}

