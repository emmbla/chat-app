const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const chalk = require('chalk');

const app = express()
const server = http.createServer(app)
const io = socketIO(server)


app.use(express.static('public'))

//client connection
io.on('connection', (socket) => {
    console.log('User connected: ', socket.id)
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
               socket.leave(data.room, () => {
                // Respond to client that leave was succesfull
                io.to(socket.id).emit('leave successful', 'success')
                console.log('left room: ', socket.id)
                // Broadcast message to all clients in the room
                io.to(data.room).emit(
                    'message',
                    {
                        name: data.name,
                        message: `Has left the room!`
                    }
                )
            })
        })
    
    socket.on('join room', (data) => {
        socket.join(data.room, () => {
            // Respond to client that join was succesfull
            io.to(socket.id).emit('join successful', 'success')
            console.log('joined room: ', socket.id)
            // Broadcast message to all clients in the room
            io.to(data.room).emit(
                'message',
                {
                    name: data.name,
                    message: `Has joined the room!`
                }
            )
        })

        socket.on('message', (message) => {
            // Broadcast message to all clients in the room
            io.to(data.room).emit('message', { name: data.name, message })
        })
           //listen on new_message
         socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, name: data.name});
    })
            //listen on typing
        socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {name: data.name, message})
    })

    })
    
    socket.on('disconnect', (data) => {
        console.log('User disconnected', socket.id)
            socket.leave(data.room, () => {
                // Respond to client that leave was succesfull
                io.to(socket.id).emit('leave successful', 'success')
                console.log('left room: ', socket.id)
                // Broadcast message to all clients in the room
                io.to(data.room).emit(
                    'message',
                    {
                        name: data.name,
                        message: `Has left the room!`
                    }
                )
            })
        })
    })

server.listen(3000, () => console.log(chalk.blue('Server is running at: http://localhost:3000')))

