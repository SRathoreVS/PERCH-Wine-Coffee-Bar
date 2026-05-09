import { motion } from 'framer-motion'
import GallerySection from '../components/sections/Gallery'

export default function Gallery() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24"
        >
            {/* Page Header */}
            <section className="section-padding pb-0">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="heading-xl text-coffee-900 dark:text-cream-50 mb-6"
                    >
                        Visual <span className="text-gradient">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-lg"
                    >
                        Explore the ambiance, experiences, and moments that define PERCH.
                    </motion.p>
                </div>
            </section>

            <GallerySection />
        </motion.div>
    )
}
