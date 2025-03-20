document.addEventListener("DOMContentLoaded", () => {
  const webcamElement = document.getElementById("webcam");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        webcamElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("Webcam access denied:", error);
      });
  } else {
    console.error("Webcam not supported in this browser.");
  }
});


songs = {
  "Happy": ["pop", "dance", "house", "electropop", "funk"],
  "Sad": ["acoustic", "singer-songwriter", "folk", "blues", "sad"],
  "Angry": ["rock", "metal", "hardcore", "punk", "heavy-metal"],
  "Surprised": ["alternative", "experimental", "indie-pop", "dubstep"],
  "Fearful": ["dark-ambient", "industrial", "soundtrack", "post-rock"],
  "Disgusted": ["grunge", "garage-rock", "noise", "punk"],
  "Neutral": ["lo-fi", "chill", "jazz", "classical", "ambient"]
};
