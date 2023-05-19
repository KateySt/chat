let stompClient = null;

function setConnected(connected) {
    document.getElementById("connect").disabled = connected;
    document.getElementById("disconnect").disabled = !connected;
    if (connected) {
        document.getElementById("conversation").style.display = "block";
    } else {
        document.getElementById("conversation").style.display = "none";
    }
    document.getElementById("greetings").innerHTML = "";
}

function connect() {
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {},
        JSON.stringify({ 'name': document.getElementById("name").value }));
    event.preventDefault();
}

function showGreeting(message) {
    const greetingElement = document.createElement("tr");
    const tdElement = document.createElement("td");
    tdElement.innerText = message;
    greetingElement.appendChild(tdElement);
    document.getElementById("greetings").appendChild(greetingElement);
}

document.addEventListener("DOMContentLoaded", function () {
    const formElement = document.querySelector("form");
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();
    });
    document.getElementById("connect").addEventListener("click", connect);
    document.getElementById("disconnect").addEventListener("click", disconnect);
    document.getElementById("send").addEventListener("click", sendName);
});