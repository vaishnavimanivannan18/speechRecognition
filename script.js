// setting variables for the buttons
const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPlayText = document.getElementById('playText');
const text = document.getElementById('text');

// creating a webKitSpeechRecognition object
let recognition = new webkitSpeechRecognition();
recognition.lang ='en-EN'
// to get the model to listen continuously
recognition.continuous = true;
// results that are not set to final yet 
recognition.interimResults = false;

recognition.onresult = (event) => {
   // result and sentence variable 
	 const results = event.results;
	 const sentence = results[results.length - 1] [0].transcript;
   // appending the recorded sentence to the text variable
	 text.value += sentence;
}

// IF STOPPED
recognition.onend = (event) => {
	console.log('the microphone stops listening');
}

// IF ERROR
recognition.onerror = (event) =>{
	console.log(event.error)
}

//start listening button
btnStartRecord.addEventListener('click',() => {
	recognition.start();
});

//stop recording button
btnStopRecord.addEventListener('click',() => {
	recognition.abort();
})

//play button 
btnPlayText.addEventListener('click',() => {
	readtext(text.value);
});

//func to read text from what's recorded
 function readtext(text){
	const speech = new SpeechSynthesisUtterance();
	speech.text = text;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;

	window.speechSynthesis.speak(speech);
}
