import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Wine, Coffee } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [location])

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'glass py-3 shadow-lg'
                        : 'bg-transparent py-5'
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Wine className="w-8 h-8 text-wine-600 transition-transform group-hover:scale-110" />
                            <Coffee className="w-4 h-4 text-primary-600 absolute -bottom-1 -right-1" />
                        </div>
                        <span className="font-display text-2xl font-bold text-gradient">
                            PERCH
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative group"
                            >
                                <span className={`text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-wine-600'
                                        : 'text-coffee-700 dark:text-cream-200 hover:text-wine-600'
                                    }`}>
                                    {link.name}
                                </span>
                                <motion.span
                                    layoutId="navbar-indicator"
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-wine-600 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                        } transition-all duration-300`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/contact" className="btn-primary text-sm">
                            Reserve a Table
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-coffee-900 dark:text-cream-100"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden pt-20"
                    >
                        <div className="absolute inset-0 bg-cream-50/95 dark:bg-coffee-950/95 backdrop-blur-xl" />
                        <nav className="relative flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`text-3xl font-display font-bold ${location.pathname === link.path
                                                ? 'text-gradient'
                                                : 'text-coffee-800 dark:text-cream-100'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 mt-8"
                            >
                                <ThemeToggle />
                                <Link to="/contact" className="btn-primary">
                                    Reserve a Table
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
