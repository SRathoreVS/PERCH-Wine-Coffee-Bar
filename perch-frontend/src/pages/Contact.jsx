import { motion } from 'framer-motion'
import ContactSection from '../components/sections/Contact'

export default function Contact() {
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
                        Get in <span className="text-gradient">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-lg"
                    >
                        We'd love to hear from you. Reach out for reservations, events, or any inquiries.
                    </motion.p>
                </div>
            </section>

            <ContactSection />
        </motion.div>
    )
}
