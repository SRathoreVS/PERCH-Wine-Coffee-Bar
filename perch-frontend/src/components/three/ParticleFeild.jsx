import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 500 }) {
    const mesh = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        const wineColor = new THREE.Color('#c9345a')
        const coffeeColor = new THREE.Color('#d4824d')
        const creamColor = new THREE.Color('#f0e9de')
        const colorOptions = [wineColor, coffeeColor, creamColor]

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            // Position
            positions[i3] = (Math.random() - 0.5) * 15
            positions[i3 + 1] = (Math.random() - 0.5) * 15
            positions[i3 + 2] = (Math.random() - 0.5) * 15

            // Color
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
            colors[i3] = color.r
            colors[i3 + 1] = color.g
            colors[i3 + 2] = color.b
        }

        return { positions, colors }
    }, [count])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (mesh.current) {
            mesh.current.rotation.y = t * 0.05
            mesh.current.rotation.x = Math.sin(t * 0.1) * 0.1
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}
