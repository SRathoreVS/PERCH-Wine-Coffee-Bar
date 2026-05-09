import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Star, MapPin } from 'lucide-react'
import Scene from '../three/Scene'
import Button from '../common/Button'
import businessData from '../../data/businessData.json'

const { business, ratings, contact } = businessData

export default function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <Scene className="opacity-30 dark:opacity-50" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream-50/50 via-transparent to-cream-50 dark:from-coffee-950/50 dark:via-transparent dark:to-coffee-950 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cream-50/80 dark:to-coffee-950/80 pointer-events-none" />

            {/* Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                >
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(ratings.overall)
                                        ? 'text-primary-500 fill-primary-500'
                                        : 'text-cream-400'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-coffee-700 dark:text-cream-200">
                        {ratings.overall} • {ratings.totalReviews}+ Reviews
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="heading-xl mb-6"
                >
                    <span className="block text-coffee-900 dark:text-cream-50">
                        {business.tagline.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className="text-gradient">
                        {business.tagline.split(' ').slice(2).join(' ')}
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="body-lg max-w-2xl mx-auto mb-8"
                >
                    {business.description}
                </motion.p>

                {/* Location */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center gap-2 text-coffee-600 dark:text-cream-400 mb-10"
                >
                    <MapPin className="w-4 h-4 text-wine-500" />
                    <span className="text-sm">{contact.address.city}, {contact.address.country}</span>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button to="/contact" variant="primary" size="lg">
                        Reserve Your Experience
                    </Button>
                    <Button to="/services" variant="secondary" size="lg">
                        Explore Our Offerings
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                >
                    {businessData.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <motion.span
                                className="block text-3xl md:text-4xl font-display font-bold text-gradient"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                            >
                                {stat.value}
                            </motion.span>
                            <span className="text-sm text-coffee-600 dark:text-cream-400">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-coffee-500 dark:text-cream-500"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    )
}
