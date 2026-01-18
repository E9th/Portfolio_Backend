"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import * as THREE from "three"

// Floating data particles
function DataParticles({ count = 200, isDark }: { count?: number; isDark: boolean }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      speeds[i] = Math.random() * 0.5 + 0.2
    }
    return [positions, speeds]
  }, [count])

  useFrame(() => {
    if (!mesh.current) return
    const positionAttribute = mesh.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      positionAttribute.array[i * 3 + 1] -= speeds[i] * 0.05
      if (positionAttribute.array[i * 3 + 1] < -15) {
        positionAttribute.array[i * 3 + 1] = 15
      }
    }
    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={isDark ? "#06b6d4" : "#0ea5e9"} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Flowing data streams (like matrix but modern)
function DataStream({ position, isDark }: { position: [number, number, number]; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y -= 0.02
      if (groupRef.current.position.y < -10) {
        groupRef.current.position.y = 10
      }
    }
  })

  const chars = useMemo(() => {
    const symbols = [
      "0",
      "1",
      "{",
      "}",
      "[",
      "]",
      "<",
      ">",
      "/",
      "=",
      ";",
      ":",
      "SELECT",
      "INSERT",
      "FROM",
      "WHERE",
      "func",
      "go",
      "err",
      "nil",
      "redis",
      "msg",
      "sql",
      "api",
      "GET",
      "POST",
      "JSON",
    ]
    return Array.from({ length: 8 }, () => symbols[Math.floor(Math.random() * symbols.length)])
  }, [])

  return (
    <group ref={groupRef} position={position}>
      {chars.map((char, i) => (
        <Text
          key={i}
          position={[0, -i * 0.8, 0]}
          fontSize={0.3}
          color={isDark ? "#06b6d4" : "#0284c7"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
          fillOpacity={1 - i * 0.1}
        >
          {char}
        </Text>
      ))}
    </group>
  )
}

// Glowing connection lines
function ConnectionLines({ isDark }: { isDark: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i < 20; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
      )
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 5,
        start.y + (Math.random() - 0.5) * 5,
        start.z + (Math.random() - 0.5) * 3,
      )
      points.push(start, end)
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      linesRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color={isDark ? "#0891b2" : "#0369a1"} transparent opacity={0.3} />
    </lineSegments>
  )
}

// Database cylinder representation
function DatabaseNode({ position, isDark }: { position: [number, number, number]; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 16]} />
        <meshStandardMaterial color={isDark ? "#06b6d4" : "#0ea5e9"} transparent opacity={0.6} wireframe />
      </mesh>
    </Float>
  )
}

// Server node representation
function ServerNode({ position, isDark }: { position: [number, number, number]; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color={isDark ? "#14b8a6" : "#0d9488"} transparent opacity={0.5} wireframe />
      </mesh>
    </Float>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  const streamPositions = useMemo(() => {
    return Array.from(
      { length: 12 },
      () =>
        [(Math.random() - 0.5) * 20, Math.random() * 20 - 10, (Math.random() - 0.5) * 10 - 5] as [
          number,
          number,
          number,
        ],
    )
  }, [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={isDark ? "#06b6d4" : "#0ea5e9"} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={isDark ? "#14b8a6" : "#0d9488"} />

      <DataParticles count={300} isDark={isDark} />
      <ConnectionLines isDark={isDark} />

      {streamPositions.map((pos, i) => (
        <DataStream key={i} position={pos} isDark={isDark} />
      ))}

      <DatabaseNode position={[-6, 2, -5]} isDark={isDark} />
      <DatabaseNode position={[5, -1, -8]} isDark={isDark} />
      <ServerNode position={[7, 3, -6]} isDark={isDark} />
      <ServerNode position={[-4, -2, -7]} isDark={isDark} />
    </>
  )
}

export default function DataFlowBackground({ isDark = true }: { isDark?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene isDark={isDark} />
      </Canvas>
      {/* Gradient overlay for better text readability */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-background/80 via-background/60 to-background/90"
            : "bg-gradient-to-b from-background/70 via-background/50 to-background/80"
        }`}
      />
    </div>
  )
}
