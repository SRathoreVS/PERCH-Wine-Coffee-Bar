import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Coffee, Wine, UtensilsCrossed, Calendar, GraduationCap, Sparkles, ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import { useQuery } from '@tanstack/react-query'
import { servicesAPI } from '../../api/index'

const iconMap = {
    Coffee,
    Wine,
    UtensilsCrossed,
    Calendar,
    GraduationCap,
    Sparkles,
}

export default function Services() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const { data, isLoading } = useQuery({

        queryKey: ['services'],

        queryFn: () => servicesAPI.getAll().then(r => r.data.data),

    })

    const services = data || []

    if (isLoading) return null  

    return (
        <section ref={ref} className="section-padding bg-coffee-950 text-cream-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wine-900/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sm font-medium text-wine-400 uppercase tracking-widest mb-4">
                        What We Offer
                    </span>
                    <h2 className="heading-lg mb-6">
                        Curated <span className="text-gradient">Experiences</span>
                    </h2>
                    <p className="body-lg max-w-2xl mx-auto text-cream-400">
                        From expertly crafted coffees to rare wine selections, discover the offerings
                        that make PERCH a destination for connoisseurs.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Coffee

                        return (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="h-full p-8 rounded-2xl bg-coffee-900/50 border border-coffee-800 
                              hover:border-wine-500/50 hover:bg-coffee-900/80
                              transition-all duration-500 card-hover">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-wine-600 to-primary-600 
                                flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform duration-500">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-display font-semibold mb-3 
                               group-hover:text-wine-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-cream-400 mb-6 line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.highlights.slice(0, 3).map((feature, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-3 py-1 rounded-full bg-coffee-800 text-cream-300"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link */}
                                    <div className="flex items-center text-wine-400 group-hover:text-wine-300 
                                transition-colors cursor-pointer">
                                        <span className="text-sm font-medium">Learn more</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-wine-500/0 via-wine-500/10 to-primary-500/0 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Button to="/services" variant="primary" size="lg">
                        View All Services
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
