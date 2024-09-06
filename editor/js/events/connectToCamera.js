import { GLOBAL_STATE } from "../state";
import { view } from "../views/view.js";
import { render } from "lit-html";

export async function connectToCamera() {
  var state = GLOBAL_STATE;
  state.cameraConnected = true;
  render(view(GLOBAL_STATE), document.getElementById("root"));

  var videoElement = document.querySelector('#camera-stream');
  var videoSelect = document.querySelector('#video-source');

  videoSelect.onchange = getStream;

  getStream().then(getDevices).then(gotDevices);

  function getDevices() {
    return navigator.mediaDevices.enumerateDevices();
  }

  function gotDevices(deviceInfos) {
    window.deviceInfos = deviceInfos; // make available to console
    console.log('Available input and output devices:', deviceInfos);
    for (const deviceInfo of deviceInfos) {
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      }
    }
  }

  function getStream() {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const videoSource = videoSelect.value;
    const constraints = {
      video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    return navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).catch(handleError);
  }

  function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoSelect.selectedIndex = [...videoSelect.options].
      findIndex(option => option.text === stream.getVideoTracks()[0].label);
    videoElement.srcObject = stream;
  }

  function handleError(error) {
    state.cameraConnected = false;
    console.error('Error: ', error);
  }
}

export function recordCamera() {
  if (window.stream) {
    GLOBAL_STATE.mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/mp4' });

    GLOBAL_STATE.mediaRecorder.addEventListener('dataavailable', function (e) {
      GLOBAL_STATE.mediaRecorderBlobs.push(e.data);
    });

    GLOBAL_STATE.mediaRecorder.addEventListener('stop', function () {
      // create local object URL from the recorded video blobs to download
      // let videoLocal = URL.createObjectURL(new Blob(GLOBAL_STATE.mediaRecorderBlobs, { type: 'video/webm' }));
      // does mp4 work?
      let videoLocal = URL.createObjectURL(new Blob(GLOBAL_STATE.mediaRecorderBlobs, { type: 'video/mp4; codecs="avc1.4d002a"' }));
      const videoLink = document.createElement("a");
      videoLink.href = videoLocal;
      videoLink.download = 'test.mp4';
      videoLink.click();
    });

    console.log("I STARTED RECORDING CAMERA AT ", Date.now());
    GLOBAL_STATE.mediaRecorder.start(1000);
  }
}

export function stopRecordingCamera() {
  GLOBAL_STATE.mediaRecorder.stop();
}

