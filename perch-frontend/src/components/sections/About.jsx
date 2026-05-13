import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wine, Coffee, Users, Award } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { businessAPI } from '../../api/index'

const features = [
    {
        icon: Wine,
        title: 'Curated Selection',
        description: 'Hand-picked wines from renowned vineyards across the globe.',
    },
    {
        icon: Coffee,
        title: 'Artisan Coffee',
        description: 'Single-origin beans roasted to perfection by expert baristas.',
    },
    {
        icon: Users,
        title: 'Warm Hospitality',
        description: 'Experience service that feels like visiting old friends.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'Committed to the highest standards in every detail.',
    },
]

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    const { data: business, isLoading } = useQuery({

        queryKey: ['business'],
        // same key → uses cached data, no new request
        queryFn: () => businessAPI.get().then(r => r.data.data),

    })

    if (isLoading) return null

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    }

    return (
        <section ref={ref} className="section-padding relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 dark:opacity-5">
                <div className="absolute top-20 right-20 w-72 h-72 bg-wine-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-40 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Content */}
                    <div>
                        <motion.span
                            variants={itemVariants}
                            className="inline-block text-sm font-medium text-wine-600 dark:text-wine-400 uppercase tracking-widest mb-4"
                        >
                            Our Story
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="heading-lg text-coffee-900 dark:text-cream-50 mb-6"
                        >
                            Where Every Sip Tells a{' '}
                            <span className="text-gradient">Story</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="body-lg mb-6"
                        >
                            {business?.description}
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-coffee-600 dark:text-cream-400 mb-8"
                        >
                            Established in {business?.established}, PERCH has become Mumbai's sanctuary
                            for wine enthusiasts and coffee aficionados alike. Our European-inspired
                            space offers a refined escape from the everyday, where quality meets comfort.
                        </motion.p>

                        {/* Features Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-6"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-wine-100 dark:bg-wine-900/30 group-hover:bg-wine-500 transition-colors duration-300">
                                            <feature.icon className="w-5 h-5 text-wine-600 dark:text-wine-400 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-coffee-900 dark:text-cream-50 mb-1">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-coffee-600 dark:text-cream-400">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Image Grid */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="space-y-4"
                            >
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-wine-200 to-wine-400 dark:from-wine-800 dark:to-wine-900">
                                    <img
                                        src="/images/about-1.jpg"
                                        alt="Wine selection"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-900">
                                    <img
                                        src="/images/about-2.jpg"
                                        alt="Coffee crafting"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="space-y-4 pt-8"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cream-200 to-cream-400 dark:from-coffee-700 dark:to-coffee-800">
                                    <img
                                        src="/images/about-3.jpg"
                                        alt="Ambiance"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-coffee-200 to-coffee-400 dark:from-coffee-600 dark:to-coffee-700">
                                    <img
                                        src="/images/about-4.jpg"
                                        alt="Experience"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="absolute -bottom-6 -left-6 p-6 rounded-2xl glass shadow-xl"
                        >
                            <div className="text-center">
                                <span className="block text-3xl font-display font-bold text-gradient">
                                    {business?.established}
                                </span>
                                <span className="text-sm text-coffee-600 dark:text-cream-400">
                                    Established
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
