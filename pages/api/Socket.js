import { Server } from 'socket.io'

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
    const players = {}
    
    io.on('connection', socket => {
      players[socket.id] = { 
        id: socket.id, 
        x: 0, 
        y: 5, 
        z: 0 
      }
      
      socket.emit('players-update', players)
      socket.broadcast.emit('player-joined', players[socket.id])
      
      socket.on('move', (data) => {
        players[socket.id] = { ...players[socket.id], ...data }
        socket.broadcast.emit('players-update', players)
      })
      
      socket.on('disconnect', () => {
        delete players[socket.id]
        socket.broadcast.emit('player-left', socket.id)
      })
    })
  }
  res.end()
}
