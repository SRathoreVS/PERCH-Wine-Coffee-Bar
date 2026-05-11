import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Wine, Coffee, MapPin, Phone, Mail, Clock,
    Instagram, Facebook, Twitter
} from 'lucide-react'
import businessData from '../../data/buisnessData.json'

const { business, contact, hours, social } = businessData

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        {
            title: 'Quick Links',
            links: [
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'FAQ', path: '/faq' },
            ],
        },
    ]

    const socialLinks = [
        { icon: Instagram, href: social.instagram, label: 'Instagram' },
        { icon: Facebook, href: social.facebook, label: 'Facebook' },
        { icon: Twitter, href: social.twitter, label: 'Twitter' },
    ]

    return (
        <footer className="relative bg-coffee-950 text-cream-100 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-wine-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-coffee-800">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="relative">
                                <Wine className="w-8 h-8 text-wine-500" />
                                <Coffee className="w-4 h-4 text-primary-400 absolute -bottom-1 -right-1" />
                            </div>
                            <span className="font-display text-2xl font-bold">PERCH</span>
                        </Link>
                        <p className="text-cream-400 text-sm leading-relaxed mb-6">
                            {business.shortDescription}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-coffee-800 hover:bg-wine-600 
                           flex items-center justify-center transition-colors duration-300"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-display font-semibold text-lg mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-cream-400 hover:text-wine-400 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-wine-500 flex-shrink-0 mt-0.5" />
                                <span className="text-cream-400">{contact.address.full}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-wine-500 flex-shrink-0" />
                                <a href={`tel:${contact.phone}`} className="text-cream-400 hover:text-wine-400 transition-colors">
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-wine-500 flex-shrink-0" />
                                <a href={`mailto:${contact.email}`} className="text-cream-400 hover:text-wine-400 transition-colors">
                                    {contact.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-wine-500 flex-shrink-0 mt-0.5" />
                                <div className="text-cream-400">
                                    <p>Mon-Thu: {hours.monday}</p>
                                    <p>Fri-Sat: {hours.friday}</p>
                                    <p>Sun: {hours.sunday}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream-500">
                    <p>© {currentYear} {business.name}. All rights reserved.</p>
                    <p>Crafted with passion for wine & coffee lovers</p>
                </div>
            </div>
        </footer>
    )
}
