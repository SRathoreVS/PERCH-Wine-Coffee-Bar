import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    icon,
    iconPosition = 'right',
    className = '',
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-gradient-to-r from-wine-600 to-primary-600 text-white shadow-lg shadow-wine-500/25 hover:shadow-xl hover:shadow-wine-500/40 hover:-translate-y-0.5',
        secondary: 'bg-transparent border-2 border-wine-600 text-wine-600 hover:bg-wine-600 hover:text-white',
        ghost: 'bg-transparent text-coffee-700 dark:text-cream-200 hover:bg-coffee-100 dark:hover:bg-coffee-800',
        glass: 'glass text-coffee-900 dark:text-cream-100 hover:shadow-lg',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    const content = (
        <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </>
    )

    const MotionComponent = motion.button

    if (to) {
        return (
            <Link to={to} className={classes} ref={ref} {...props}>
                {content}
            </Link>
        )
    }

    if (href) {
        return (
            <a href={href} className={classes} ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
                {content}
            </a>
        )
    }

    return (
        <MotionComponent
            ref={ref}
            className={classes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {content}
        </MotionComponent>
    )
})

Button.displayName = 'Button'

export default Button
