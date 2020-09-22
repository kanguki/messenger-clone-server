const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ memberIds, text }) => {
        memberIds.forEach(member => {
            const newRecipients = memberIds.filter(m => m !== member)    //each member in room has contact to the other(not themselves)
            newRecipients.push(id) 
            socket.broadcast.to(member).emit('receive-message',{memberIds: newRecipients, sender: id, text})
        })
    })
})