export default function MobileControls() {
  const jump = () => window.playerAPI?.jump()
  const moveLeft = () => window.playerAPI?.moveLeft()
  const moveRight = () => window.playerAPI?.moveRight()

  return (
    <div style={{
      position: 'fixed',
      bottom: 30,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0 20px'
    }}>
      <TouchButton onPress={moveLeft}>⬅️</TouchButton>
      <TouchButton onPress={jump}>⬆️</TouchButton>
      <TouchButton onPress={moveRight}>➡️</TouchButton>
    </div>
  )
}

function TouchButton({ onPress, children }) {
  return (
    <button
      onTouchStart={(e) => {
        e.preventDefault()
        onPress()
      }}
      style={{
        width: 80,
        height: 80,
        fontSize: 24,
        background: 'rgba(255,255,255,0.2)',
        border: '2px solid white',
        borderRadius: '50%',
        color: 'white',
        backdropFilter: 'blur(10px)',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </button>
  )
}
