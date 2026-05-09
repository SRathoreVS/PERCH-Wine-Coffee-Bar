import { motion } from 'framer-motion'
import businessData from '../data/businessData.json'

const { business, contact } = businessData

export default function Terms() {
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
                    Terms of Service
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
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        By accessing and using {business.name}'s services, you accept and agree to be bound by
                        these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        2. Reservations
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        Reservations are subject to availability. We reserve the right to cancel reservations
                        in cases of no-shows or violations of our policies.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        3. Conduct
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        We expect all guests to maintain respectful and appropriate behavior. We reserve the
                        right to refuse service to anyone who violates this policy.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        4. Limitation of Liability
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        {business.name} shall not be liable for any indirect, incidental, special, consequential,
                        or punitive damages arising from your use of our services.
                    </p>

                    <h2 className="heading-md text-coffee-900 dark:text-cream-50 mt-8 mb-4">
                        5. Contact
                    </h2>
                    <p className="text-coffee-600 dark:text-cream-400 mb-4">
                        For questions regarding these Terms, contact us at{' '}
                        <a href={`mailto:${contact.email}`} className="text-wine-600 hover:text-wine-500">
                            {contact.email}
                        </a>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
