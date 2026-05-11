import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useEffect } from 'react'

// Components
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Loading from './components/common/Loading'
import CustomCursor from './components/common/CustomCursor'
import ScrollProgress from './components/common/ScrollProgress'
import SmoothScroll from './components/common/SmoothScroll'

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

function App() {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <SmoothScroll>
            <div className="relative min-h-screen">
                <CustomCursor />
                <ScrollProgress />
                <Navbar />

                <main>
                    <Suspense fallback={<Loading />}>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/terms" element={<Terms />} />
                            </Routes>
                        </AnimatePresence>
                    </Suspense>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    )
}

export default App
