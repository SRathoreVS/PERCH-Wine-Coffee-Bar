import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei'
import FloatingObjects from './FloatingObjects'
import ParticleField from './ParticleField'

export default function Scene({ className = '' }) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#d4824d" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9345a" />

                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                        <FloatingObjects />
                    </Float>

                    <ParticleField count={500} />
                    <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                    <Environment preset="city" />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
