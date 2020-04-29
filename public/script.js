const socket = io()

window.addEventListener('load', () => {
  setupEventListeners()
})

function setupEventListeners() {
  // Join on submit
  const joinChat = document.querySelector('form.nic-name')
  joinChat.addEventListener('submit', onJoinRoom)

  const join = document.querySelector('form.join')
  join.addEventListener('submit', joinRoom)

  // Send message on submit
  const messageChat = document.querySelector('.chat form')
  messageChat.addEventListener('submit', onSendMessage)

  // Leave chat on submit
  const leaveChat = document.querySelector('.chat-leave')
  leaveChat.addEventListener('submit', onLeaveRoom)

  // Socket io events
  socket.on('join success', joinChatRoom)
  socket.on('new_message', onReceivedMessage)
  socket.on('rooms', onGetRooms)
}

function onJoinRoom(event) {
  event.preventDefault()
  const [nameInput] = document.querySelectorAll('.join input')

  const name = nameInput.value

  document.querySelector('.join-lobby').classList.add('hidden')
  document.querySelector('.aside').classList.remove('hidden')
  document.querySelector('.join-room').classList.remove('hidden')
  socket.emit('rooms', { name })
}

function joinRoom(event) {
  event.preventDefault()
  const [nameInput] = document.querySelectorAll('.join input')
  const [roomInput] = document.querySelectorAll('.join-room input')
  const room = roomInput.value
  const name = nameInput.value

  socket.emit('join room', { name, room })
}

function onLeaveRoom(event) {
  event.preventDefault()
  location.reload()
  }

function onSendMessage(event) {
  event.preventDefault()
  const input = document.querySelector('.chat form input')
  socket.emit('new_message', input.value)
  input.value = ''
}

function onReceivedMessage({ name, message }) {
  const ul = document.querySelector('.chat ul')
  const li = document.createElement('li')
  li.innerText = `${name}: ${message}`
  ul.append(li)
}

function joinChatRoom(data) {
  console.log(data)
  document.querySelector('.join-room').classList.add('hidden')
  document.querySelector('.chat').classList.remove('hidden')
}

function onGetRooms(rooms) {
  console.log(rooms)
  const ul = document.querySelector('aside ul')
  const liElements = rooms.map(room => {
    const li = document.createElement('li')
    li.innerText = room
    return li
  })
  ul.innerText = ""
  ul.append(...liElements)
}


/*//buttons and inputs
var message = $("#message")
var name = $("#name")
var send_message = $("#send_message")
var chatroom = $("#chatroom")
var feedback = $("#feedback")

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.name + ": " + data.message + "</p>")
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.name + " is typing a message..." + "</i></p>")
	})*/
