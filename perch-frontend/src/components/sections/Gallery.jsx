import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { galleryAPI } from '../../api/index'

export default function Gallery() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const [activeCategory, setActiveCategory] = useState('All')
    const [selectedImage, setSelectedImage] = useState(null)

    const { data: galleryData, isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => galleryAPI.getAll({ limit: 50 }).then(r => r.data.data),
    })

    const gallery = galleryData || []

    const filteredImages =
        activeCategory === 'All'
            ? gallery
            : gallery.filter((item) => item.category === activeCategory)


    const categories = ['All', ...new Set(gallery.map(item => item.category))]

    if (isLoading) return null

    return (
        <section ref={ref} className="section-padding">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-sm font-medium text-wine-600 dark:text-wine-400 uppercase tracking-widest mb-4">
                        Gallery
                    </span>
                    <h2 className="heading-lg text-coffee-900 dark:text-cream-50 mb-6">
                        A Glimpse of <span className="text-gradient">PERCH</span>
                    </h2>
                    <p className="body-lg max-w-2xl mx-auto">
                        Step inside our world of refined experiences through these moments captured at PERCH.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-wine-600 text-white shadow-lg shadow-wine-500/25'
                                    : 'glass text-coffee-700 dark:text-cream-200 hover:bg-wine-100 dark:hover:bg-wine-900/30'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image._id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="break-inside-avoid relative group cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <div
                                        className="aspect-[4/5] bg-gradient-to-br from-wine-200 to-primary-200 
                              dark:from-wine-800 dark:to-primary-800"
                                    >
                                        <img
                                            src={image.imageUrl}
                                            alt={image.altText || image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                flex items-end justify-between p-6">
                                        <div>
                                            <p className="text-white font-medium">{image.alt}</p>
                                            <p className="text-cream-300 text-sm">{image.category}</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-950/95 p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button
                                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 
                         transition-colors text-white"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="max-w-4xl w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="rounded-2xl overflow-hidden">
                                    <img
                                        src={selectedImage.imageUrl}
                                        alt={selectedImage.altText || selectedImage.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-white font-medium">{selectedImage.alt}</p>
                                    <p className="text-cream-400 text-sm">{selectedImage.category}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
