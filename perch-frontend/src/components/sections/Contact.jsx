import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import Button from '../common/Button'
import businessData from '../../data/buisnessData.json'

const { contact, hours } = businessData

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            content: contact.address.full,
            action: {
                label: 'Get Directions',
                href: `[google.com](https://www.google.com/maps?q=${contact.coordinates.lat},${contact.coordinates.lng})`,
            },
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: contact.phone,
            action: {
                label: 'Call Now',
                href: `tel:${contact.phone}`,
            },
        },
        {
            icon: Mail,
            title: 'Email Us',
            content: contact.email,
            action: {
                label: 'Send Email',
                href: `mailto:${contact.email}`,
            },
        },
        {
            icon: Clock,
            title: 'Opening Hours',
            content: `Mon-Thu: ${hours.monday}`,
            subContent: `Fri-Sat: ${hours.friday}`,
        },
    ]

    return (
        <section ref={ref} className="section-padding bg-cream-100/50 dark:bg-coffee-900/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sm font-medium text-wine-600 dark:text-wine-400 uppercase tracking-widest mb-4">
                        Get in Touch
                    </span>
                    <h2 className="heading-lg text-coffee-900 dark:text-cream-50 mb-6">
                        We'd Love to <span className="text-gradient">Hear From You</span>
                    </h2>
                    <p className="body-lg max-w-2xl mx-auto">
                        Whether you're planning a visit, hosting an event, or simply have a question,
                        we're here to help make your experience exceptional.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-8 rounded-3xl glass">
                            <h3 className="heading-md text-coffee-900 dark:text-cream-50 mb-6">
                                Send Us a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-coffee-700 dark:text-cream-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-coffee-800/50 
                               border border-cream-300 dark:border-coffee-700
                               focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20
                               outline-none transition-all duration-300
                               text-coffee-900 dark:text-cream-100"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-coffee-700 dark:text-cream-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-coffee-800/50 
                               border border-cream-300 dark:border-coffee-700
                               focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20
                               outline-none transition-all duration-300
                               text-coffee-900 dark:text-cream-100"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-coffee-700 dark:text-cream-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-coffee-800/50 
                             border border-cream-300 dark:border-coffee-700
                             focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20
                             outline-none transition-all duration-300
                             text-coffee-900 dark:text-cream-100"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-coffee-700 dark:text-cream-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-coffee-800/50 
                             border border-cream-300 dark:border-coffee-700
                             focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20
                             outline-none transition-all duration-300 resize-none
                             text-coffee-900 dark:text-cream-100"
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>

                                <Button type="submit" variant="primary" size="lg" className="w-full" icon={<Send className="w-5 h-5" />}>
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="p-6 rounded-2xl glass group hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 
                                flex items-center justify-center mb-4
                                group-hover:bg-wine-500 transition-colors duration-300">
                                        <info.icon className="w-6 h-6 text-wine-600 dark:text-wine-400 
                                        group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="font-semibold text-coffee-900 dark:text-cream-50 mb-1">
                                        {info.title}
                                    </h4>
                                    <p className="text-sm text-coffee-600 dark:text-cream-400">
                                        {info.content}
                                    </p>
                                    {info.subContent && (
                                        <p className="text-sm text-coffee-600 dark:text-cream-400">
                                            {info.subContent}
                                        </p>
                                    )}
                                    {info.action && (
                                        <a
                                            href={info.action.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-3 text-sm font-medium text-wine-600 dark:text-wine-400 
                               hover:text-wine-700 dark:hover:text-wine-300 transition-colors"
                                        >
                                            {info.action.label} →
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="h-64 md:h-80 rounded-2xl overflow-hidden glass">
                            <iframe
                                src={`[google.com](https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771!2d${contact.coordinates.lng}!3d${contact.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzE3LjkiTiA3MsKwNDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1234567890)`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="PERCH Location"
                            />
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={`[wa.me](https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Hi, I'd like to make a reservation at PERCH.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 p-4 rounded-2xl 
                       bg-green-500 hover:bg-green-600 text-white font-medium
                       transition-colors duration-300"
                        >
                            <MessageCircle className="w-6 h-6" />
                            <span>Chat with us on WhatsApp</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
