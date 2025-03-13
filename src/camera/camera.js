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