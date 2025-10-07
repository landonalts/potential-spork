export default function OtherPlayers({ players }) {
  return (
    <>
      {Object.values(players).map(player => (
        <mesh key={player.id} position={[player.x, player.y, player.z]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  )
}
