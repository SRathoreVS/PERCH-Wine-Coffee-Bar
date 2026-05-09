import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei'

export default function FloatingObjects() {
    const sphereRef = useRef()
    const torusRef = useRef()
    const boxRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2
            sphereRef.current.rotation.y = t * 0.3
            sphereRef.current.position.y = Math.sin(t * 0.5) * 0.3
        }

        if (torusRef.current) {
            torusRef.current.rotation.x = t * 0.3
            torusRef.current.rotation.z = t * 0.2
            torusRef.current.position.y = Math.sin(t * 0.5 + 1) * 0.3
        }

        if (boxRef.current) {
            boxRef.current.rotation.x = t * 0.2
            boxRef.current.rotation.y = t * 0.4
            boxRef.current.position.y = Math.sin(t * 0.5 + 2) * 0.3
        }
    })

    return (
        <group>
            {/* Wine-colored sphere */}
            <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[-2, 0, 0]}>
                <MeshDistortMaterial
                    color="#c9345a"
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                />
            </Sphere>

            {/* Coffee-colored torus */}
            <Torus ref={torusRef} args={[0.6, 0.2, 32, 64]} position={[2, 0, 0]}>
                <MeshDistortMaterial
                    color="#d4824d"
                    roughness={0.2}
                    metalness={0.6}
                    distort={0.2}
                    speed={1.5}
                />
            </Torus>

            {/* Cream-colored box */}
            <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[0, 1.5, 0]}>
                <MeshDistortMaterial
                    color="#f0e9de"
                    roughness={0.3}
                    metalness={0.4}
                    distort={0.15}
                    speed={1}
                />
            </Box>
        </group>
    )
}
