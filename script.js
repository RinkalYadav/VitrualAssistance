let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let synth = window.speechSynthesis;

  // Wait for voices to load if not already
  if (synth.getVoices().length === 0) {
    synth.addEventListener("voiceschanged", () => {
      speak(text); // Retry speaking once voices are loaded
    });
    return; // Exit now and wait for voices to load
  }

  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";

  const voices = synth.getVoices();
  const britishVoice = voices.find(v => v.lang === 'en-GB');
  if (britishVoice) text_speak.voice = britishVoice;

  synth.cancel(); // Stop any current speech
  synth.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good morning sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon sir");
  } else {
    speak("Good evening sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!speechRecognition) {
  speak("Speech recognition is not supported on this device.");
  alert("Speech Recognition is not supported on this device.");
} else {
  let recognition = new speechRecognition();

  recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
  };

  btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; // Hide button when listening
    voice.style.display = "block"; // Show voice icon while listening
    content.innerText = "Listening..."; // Give feedback to the user
  });

  recognition.onend = () => {
    btn.style.display = "flex"; // Show button again after recognition ends
    voice.style.display = "none"; // Hide voice icon
    content.innerText = "Listening finished."; // Notify user
  };
}

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  content.innerText = ""; // Clear any previous text

  if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am your virtual assistant, created by Rinkal Sir.");
  }
  else if (message.includes("How is Avnish")) {
    speak("Avanish ek number ka kutta hai.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com/");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com/");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("whatsapp://");
  } else if (message.includes("open calculator")) {
    speak("Opening Calculator...");
    window.open("calculator://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    let finalText =
      "This is what I found on the internet regarding " +
      (message.replace("alexa", "") || message.replace("alesa", ""));
    speak(finalText);
    window.open(
      `https://www.google.com/search?q=${
        message.replace("alexa", "") || message.replace("alesa", "")
      }`
    );
  }
}
