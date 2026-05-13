import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { faqAPI } from '../../api/index'

export default function FAQ() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['faqs'],
        queryFn: () => faqAPI.getAll().then(r => r.data.data),
    })
    const faq = data || []
    if (isLoading) return null

    return (
        <section ref={ref} className="section-padding">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-wine-600 dark:text-wine-400 uppercase tracking-widest mb-4">
                        <HelpCircle className="w-4 h-4" />
                        FAQ
                    </span>
                    <h2 className="heading-lg text-coffee-900 dark:text-cream-50 mb-6">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="body-lg">
                        Everything you need to know about your PERCH experience.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faq.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-2xl glass overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-6 flex items-center justify-between text-left
                         hover:bg-wine-50/50 dark:hover:bg-wine-900/10 transition-colors"
                            >
                                <span className="font-semibold text-coffee-900 dark:text-cream-50 pr-4">
                                    {item.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-wine-600 dark:text-wine-400" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-coffee-600 dark:text-cream-400">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12 p-8 rounded-2xl glass"
                >
                    <h3 className="text-xl font-display font-semibold text-coffee-900 dark:text-cream-50 mb-2">
                        Still have questions?
                    </h3>
                    <p className="text-coffee-600 dark:text-cream-400 mb-6">
                        We're here to help. Reach out to us directly.
                    </p>
                    <a
                        href="mailto:hello@perchbar.com"  
                        className="btn-primary inline-flex"
                    >
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
