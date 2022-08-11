// module.exports = {
//     get_emoji: () => {
//       const randomNum = Math.random();
//       let book = "📗";
  
//       if (randomNum > 0.7) {
//         book = "📘";
//       } else if (randomNum > 0.4) {
//         book = "📙";
//       }
  
//       return `<span for="img" aria-label="book">${book}</span>`;
//     },
//   };

//  var socket = io();

// var messages = document.getElementById('messages');
// var form = document.getElementById('form');
// var input = document.getElementById('input');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', input.value);
//         input.value = '';
//     }
// });

// socket.on('chat message', function (msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });
