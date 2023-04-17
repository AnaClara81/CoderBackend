console.log('Socket')
const socket = io()

/*socket.emit('message', 'Hola me estoy comunicando desde un cliente socket')

socket.on('evento-para-socket-individual', data => {
    console.log(data)
})

socket.on('evt-p-todo-menos-el-socket-actual', data => {
    console.log(data)
})

socket.on('evt-para-todos', data => {
    console.log(data)
})*/

const input = document.getElementById('text')
const log = document.getElementById('mensajes')

input.addEventListener('keyup', evt =>{
    if(evt.key ==="Enter"){
        socket.emit('message2',input.value)
        input.value=""
    }
})

socket.on('log',data =>{
    let logs =''
    data.logs.forEach(log => {  
      logs +=`<li>"${log.socket} dice: ${log.message}</li>`
        
    })

    log.innerHTML=logs
})