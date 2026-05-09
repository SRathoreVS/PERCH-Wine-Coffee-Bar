import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import businessData from '../../data/buisnessData.json'

const { testimonials, ratings } = businessData

export default function Testimonials() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    return (
        <section ref={ref} className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream-100/50 to-transparent dark:from-coffee-900/30 dark:to-transparent" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sm font-medium text-wine-600 dark:text-wine-400 uppercase tracking-widest mb-4">
                        Testimonials
                    </span>
                    <h2 className="heading-lg text-coffee-900 dark:text-cream-50 mb-6">
                        What Our <span className="text-gradient">Guests Say</span>
                    </h2>

                    {/* Rating Summary */}
                    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(ratings.overall)
                                            ? 'text-primary-500 fill-primary-500'
                                            : 'text-cream-400'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-lg font-semibold text-coffee-900 dark:text-cream-50">
                            {ratings.overall}
                        </span>
                        <span className="text-coffee-600 dark:text-cream-400">
                            from {ratings.totalReviews}+ reviews
                        </span>
                    </div>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="relative p-8 md:p-12 rounded-3xl glass"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 left-6 w-12 h-12 text-wine-500/20 dark:text-wine-400/20" />

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                {/* Stars */}
                                <div className="flex items-center justify-center gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-primary-500 fill-primary-500" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-xl md:text-2xl font-display text-coffee-800 dark:text-cream-100 mb-8 leading-relaxed">
                                    "{testimonials[currentIndex].content}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-wine-500 to-primary-500 
                                flex items-center justify-center text-white font-bold text-lg">
                                        {testimonials[currentIndex].name.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-coffee-900 dark:text-cream-50">
                                            {testimonials[currentIndex].name}
                                        </p>
                                        <p className="text-sm text-coffee-600 dark:text-cream-400">
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full glass hover:bg-wine-500 hover:text-white 
                       transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex
                                            ? 'w-8 bg-wine-600'
                                            : 'bg-coffee-300 dark:bg-coffee-600 hover:bg-wine-400'
                                        }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-3 rounded-full glass hover:bg-wine-500 hover:text-white 
                       transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
