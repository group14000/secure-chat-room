let token = "";
let socket = null;

async function register() {
  const userId = document.getElementById("regUserId").value;
  const deviceId = document.getElementById("regDeviceId").value;
  const name = document.getElementById("regName").value;
  const phone = document.getElementById("regPhone").value;
  const availCoins = document.getElementById("regAvailCoins").value;
  const password = document.getElementById("regPassword").value;

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        deviceId,
        name,
        phone,
        availCoins,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      alert(`Error: ${errorData}`);
      return;
    }

    const data = await response.json();
    token = data.token;
    alert("Registration successful!");
    document.getElementById("registration").style.display = "none";
    document.getElementById("login").style.display = "block";
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred. Please try again.");
  }
}

async function login() {
  const phone = document.getElementById("loginPhone").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });

  const data = await response.json();
  if (response.ok) {
    token = data.token;
    alert("Login successful!");
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
    initializeSocket();
  } else {
    alert(`Error: ${data}`);
  }
}

function initializeSocket() {
  socket = io();
  socket.on("chat message", function (msg) {
    const chatMessages = document.getElementById("chatMessages");
    const messageElement = document.createElement("div");
    messageElement.textContent = msg.content;
    chatMessages.appendChild(messageElement);
  });
}

async function joinRoom() {
  const roomId = document.getElementById("roomId").value;
  const roomPassword = document.getElementById("roomPassword").value;

  const response = await fetch("http://localhost:3000/api/joinroom", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-auth-token": token },
    body: JSON.stringify({ roomId, roomPassword }),
  });

  if (response.ok) {
    alert("Joined room successfully!");
  } else {
    const data = await response.json();
    alert(`Error: ${data}`);
  }
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput").value;
  if (messageInput.trim()) {
    socket.emit("chat message", { content: messageInput });
    document.getElementById("messageInput").value = "";
  }
}
