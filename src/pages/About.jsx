import { motion } from 'framer-motion'
import AboutSection from '../components/sections/About'
import Testimonials from '../components/sections/Testimonials'

export default function About() {
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
                        Our <span className="text-gradient">Story</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-lg"
                    >
                        Discover the passion, philosophy, and people behind PERCH Wine & Coffee Bar.
                    </motion.p>
                </div>
            </section>

            <AboutSection />
            <Testimonials />
        </motion.div>
    )
}
