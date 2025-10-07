import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, useBox, useSphere } from '@react-three/cannon'
import { Sky, Environment, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

export default function OnlyUpGame() {
  const [players, setPlayers] = useState({})
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io()
    
    socketRef.current.emit('join-game')
    socketRef.current.on('players-update', setPlayers)
    
    return () => socketRef.current.disconnect()
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', touchAction: 'none' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        
        <Physics gravity={[0, -30, 0]}>
          <Player socket={socketRef.current} />
          <Platforms />
          {Object.values(players).map(player => (
            <OtherPlayer key={player.id} data={player} />
          ))}
        </Physics>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      
      <MobileControls />
    </div>
  )
}
