var socket = io();

var form = document.getElementById('message-form');
var input = document.getElementById('msg');
// var form1 = document.getElementById('form1');
// var input1 = document.getElementById('input1');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});

// form1.addEventListener('submit', function(e) {
//   e.preventDefault();
//   if (input1.value) {
//     socket.emit('theodore', input1.value);
//     input1.value = '';
//   }

//   socket.on('theodore', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     document.querySelector("#messages1").appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//   });
// });

