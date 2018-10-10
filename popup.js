var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
  chrome.tabs.executeScript(null, { file: "jquery-3.3.1.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "payload.js" });
  });

  // chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
  //   file: 'payload.js'
  // });;
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
  // document.getElementById('pagetitle').innerHTML = message;
  console.log('received message');
  console.log(message);

  var img = document.createElement("img");
   
  img.src = message;
  var gallery = document.getElementById("gallery");
   
  gallery.appendChild(img);
});

/* Connects to the socket server */
var socket = io.connect('http://localhost:3002');
socket.on('connect', function() {
  console.log('Client connected');
});

