import { useBox } from '@react-three/cannon'
import { useEffect, useRef } from 'react'

export default function Platforms() {
  const platforms = useRef([])
  
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      platforms.current.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 10,
          i * 3 + 2,
          (Math.random() - 0.5) * 10
        ],
        size: [Math.random() * 3 + 1, 0.2, Math.random() * 3 + 1]
      })
    }
  }, [])

  return (
    <>
      {platforms.current.map(platform => (
        <Platform key={platform.id} {...platform} />
      ))}
    </>
  )
}

function Platform({ position, size }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}
