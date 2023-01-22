// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvM3JrkAXaxYRtCbVzSC5eGtTWeTCtM3o",
  authDomain: "kh0wweb.firebaseapp.com",
  projectId: "kh0wweb",
  storageBucket: "kh0wweb.appspot.com",
  messagingSenderId: "269005530278",
  appId: "1:269005530278:web:3c75250ac3a13e66a30067",
  measurementId: "G-S6C722C4RB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get references to the input field and message list
const messageInput = document.querySelector("#message-input");
const messageList = document.querySelector("#message-list");

// Listen for form submission
document.querySelector("form").addEventListener("submit", e => {
  // Prevent form from submitting
  e.preventDefault();

  // Get the message text
  const messageText = messageInput.value;

  // Add the message to the Firebase Realtime Database
  database.ref("messages").push({
    message: messageText,
    timestamp: Date.now()
  });

  // Clear the input field
  messageInput.value = "";
});

// Listen for new messages in the Firebase Realtime Database
database.ref("messages").on("child_added", snapshot => {
  // Get the message data
  const message = snapshot.val();

  // Create a new list item for the message
  const messageListItem = document.createElement("li");
  messageListItem.innerText = message.message;

  // Add the message to the message list
  messageList.appendChild(messageListItem);
});
