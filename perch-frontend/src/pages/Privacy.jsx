import { motion } from 'framer-motion'
import businessData from '../data/buisnessData.json'

const { business } = businessData

export default function Privacy() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 section-padding"
        >
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="heading-lg text-coffee-900 dark:text-cream-50 mb-8"
                >
                    Privacy Policy
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                >
                    <p className="text-coffee-600 dark:text-cream-400 mb-6">
                        Last updated: May 2026
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        1. Information We Collect
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        At {business.name}, we collect information you provide directly to us, such as when you
                        make a reservation, sign up for our newsletter, or contact us with inquiries.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        2. How We Use Your Information
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        We use the information we collect to process reservations, communicate with you about
                        our services, and improve your experience at PERCH.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        3. Information Sharing
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        We do not sell, trade, or otherwise transfer your personal information to third parties
                        without your consent, except as required by law.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        4. Data Security
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        We implement appropriate security measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        5. Contact Us
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        If you have questions about this Privacy Policy, please contact us at{' '}
                        <a href={`mailto:${businessData.contact.email}`} className="text-wine-600 hover:text-wine-500">
                            {businessData.contact.email}
                        </a>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
