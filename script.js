// All neded variables.
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById ('send-container')
const messageInput = document.getElementById('message-input')



// Creates new socket for names and emits name.


//waits for body to load, before prompt.
window.addEventListener("load", function () {
// Prompt to enter name in variable.
const name = prompt('Enter your name:')
 socket.emit('new-user', name)
  setTimeout(function(){ document.getElementById("skipbutton").style.visibility = "visible"; }, 8000);
 
});



// Creates new socket for message and emits new message.
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

// On sumbit, text from inputfield gets put in variable and send to socket.
messageForm.addEventListener('submit', e => {

    // To prevent the page from refreshing and deleting older messages.
    e.preventDefault()


    const message = messageInput.value
    socket.emit('send-chat-message', message)

    // Empties inputfield.
    messageInput.value = ''
})

// Logic for messages and likebutton
let buttonID = 0;

//Waits for message
function appendMessage(message) {

    // For all new messages, the like button gets a unique ID
    buttonID ++

    // Creates div for messages and creates like button.
    document.getElementById('message-container').innerHTML+="<div class='message'>" + message;
    // + "<button id=" + buttonID +"><i class='far fa-thumbs-up'></i></button></div>"

    // creates variable for the last message to arrive.
    const likeButton=document.querySelector(".message:last-child button");

    // When clicked on the like button, the message, that belongs to the button, gets send to the server.
    likeButton.addEventListener("click",function(event){
        const messageApproved = document.getElementById("demo").innerHTML = message;
        socket.on('chat-message', data => {
            appendMessage(`${data.name}: ${data.message}`)
        })
    })
}


// Function to add message to db
function AddToDB(){
    
}

//Animation for sendbutton.
let button = document.querySelector('.button');
let buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"30\" height=\"22\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";

buttonText.innerHTML = "<i class='fas fa-long-arrow-alt-right'></i>";

button.addEventListener('click', function() {

  if (buttonText.innerHTML !== "<i class='fas fa-long-arrow-alt-right'></i>") {
    buttonText.innerHTML = tickMark;
  } else if (buttonText.innerHTML === tickMark) {
    buttonText.innerHTML = "<i class='fas fa-long-arrow-alt-right'></i>";
  }
  this.classList.toggle('button__circle')
});