const { Socket } = require('dgram');
const express = require('express');
var body_parser = require('body-parser');
const app = express();

const http = require('http')
const server = http.createServer(app)

const path = require('path');

const {Server} = require('socket.io');
const { measureMemory } = require('vm');
const io = new Server(server)

io.on('connection', (socket)=>{
    console.log('Un usuario se ha conectado')

    socket.on('disconnect', ()=>{
        console.log("Un usuario se ha desconectado.")
    })

    socket.on('chat', (msg)=>{
        io.emit('chat', msg)
    })
})

app.use(express.json())
app.post('/webhook', (req, res)=>{
    let mensaje = req.body.mensaje || '';
    if(mensaje != ''){
        io.emit('chat', mensaje)
        res.send('Complete')
    }
    
})

app.get('/', (req, res)=>{
    //res.send("Mi primer chat")
    const dirPath = path.join(__dirname, '/cliente/index.html');
    res.sendFile(dirPath)
})

server.listen(3000, ()=> {
    console.log('Servidor ejecutandose en http://localhost:3000')
})