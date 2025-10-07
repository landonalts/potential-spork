import { useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useRef } from 'react'

export default function Player({ socket }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 5, 0],
    args: [0.5]
  }))

  const velocity = useRef([0, 0, 0])
  
  useFrame(() => {
    if (ref.current && socket) {
      const [x, y, z] = ref.current.position
      socket.emit('move', { x, y, z })
    }
    api.velocity.subscribe(v => velocity.current = v)
  })

  // Export controls for mobile
  if (typeof window !== 'undefined') {
    window.playerAPI = {
      jump: () => api.velocity.set(0, 15, 0),
      moveLeft: () => api.velocity.set(-8, velocity.current[1], 0),
      moveRight: () => api.velocity.set(8, velocity.current[1], 0)
    }
  }

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
